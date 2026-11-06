<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Pterodactyl\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Pterodactyl\Events\Auth\DirectLogin;
use Pterodactyl\Facades\Activity;
use Pterodactyl\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class SsoController extends Controller
{
    /**
     * Authenticate a user via a signed one-time SSO token from panel store.
     */
    public function authenticate(Request $request): Response
    {
        $token = $request->query('token');
        if (empty($token) || !is_string($token)) {
            return redirect('/auth/login?error=sso_token_missing');
        }

        // Token format: base64url(payload) . '.' . hex(hmac_signature)
        $parts = explode('.', $token, 2);
        if (count($parts) !== 2) {
            return redirect('/auth/login?error=sso_malformed_token');
        }

        [$payloadBase64, $signature] = $parts;

        $secret = config('pterodactyl.sso_secret') ?: (config('pterodactyl.service.api_key') ?: config('app.key'));
        $expectedSignature = hash_hmac('sha256', $payloadBase64, $secret);

        if (!hash_equals($expectedSignature, $signature)) {
            return redirect('/auth/login?error=sso_invalid_signature');
        }

        // Decode payload
        $json = base64_decode(strtr($payloadBase64, '-_', '+/'), true);
        if (!$json) {
            return redirect('/auth/login?error=sso_invalid_payload');
        }

        $payload = json_decode($json, true);
        if (!is_array($payload)) {
            return redirect('/auth/login?error=sso_invalid_payload');
        }

        // Expiration check (TTL 60s)
        $exp = $payload['exp'] ?? 0;
        if (time() > $exp) {
            return redirect('/auth/login?error=sso_expired');
        }

        // Single-use check (anti-replay)
        $jti = $payload['jti'] ?? null;
        if (empty($jti)) {
            return redirect('/auth/login?error=sso_missing_jti');
        }

        $cacheKey = 'sso:token:' . $jti;
        if (Cache::has($cacheKey)) {
            return redirect('/auth/login?error=sso_already_used');
        }
        // Invalidate token for 2 minutes
        Cache::put($cacheKey, true, 120);

        // Find user by pterodactyl_user_id or email
        $user = null;
        if (!empty($payload['pterodactyl_user_id'])) {
            $user = User::query()->where('id', (int) $payload['pterodactyl_user_id'])->first();
        }
        if (!$user && !empty($payload['email'])) {
            $user = User::query()->where('email', (string) $payload['email'])->first();
        }

        if (!$user) {
            return redirect('/auth/login?error=sso_user_not_found');
        }

        // Log the user into Pterodactyl web session
        $request->session()->remove('auth_confirmation_token');
        $request->session()->regenerate();

        Auth::guard()->login($user, true);
        Event::dispatch(new DirectLogin($user, true));
        Activity::event('auth:sso')->withRequestMetadata()->subject($user)->log();

        // Safely determine redirect path
        $redirect = $payload['redirect'] ?? '/';
        if (!is_string($redirect) || !str_starts_with($redirect, '/') || str_starts_with($redirect, '//')) {
            $redirect = '/';
        }

        return redirect()->to($redirect);
    }
}

