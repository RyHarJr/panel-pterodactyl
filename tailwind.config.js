const colors = require('tailwindcss/colors');

// Custom dark slate ramp tuned for Pterodactyl's UI hierarchy to match Panel Store FE:
// 950: Deepest obsidian (terminal, deepest contrast)
// 900: Navbar, card headers, dropdowns, modal frames (#0f172a / slate-900)
// 800: Page body background (#0b0f19 - deep slate navy like panel-storev2-fe dark)
// 700: Card / container surfaces (#131c2e - elevated dark slate card)
// 600: Inner card blocks / stat boxes / elevated surfaces (#1e293b - slate-800)
// 500: Borders & secondary elements (#334155 - slate-700)
// 400: Muted descriptions & icons (#64748b - slate-500)
// 300: Secondary text (#94a3b8 - slate-400)
// 200: Readable body & title text (#cbd5e1 - slate-300)
// 100: Bright headings (#f1f5f9 - slate-100)
// 50:  High-contrast text (#f8fafc - slate-50)
const darkSlate = {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#cbd5e1',
    300: '#94a3b8',
    400: '#64748b',
    500: '#334155',
    600: '#1e293b',
    700: '#131c2e',
    800: '#0b0f19',
    900: '#0f172a',
    950: '#020617',
};

// Brand Indigo accent ramp matching panel-storev2-fe
const brandIndigo = {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8', // indigo-400
    500: '#6366f1', // indigo-500
    600: '#4f46e5', // indigo-600 (primary brand)
    700: '#4338ca', // indigo-700
    800: '#3730a3',
    900: '#312e81',
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ['"Inter"', '"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
                sans: ['"Inter"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
            },
            colors: {
                black: '#020617',
                primary: brandIndigo,
                blue: brandIndigo,
                cyan: brandIndigo,
                gray: darkSlate,
                neutral: darkSlate,
                accent: colors.purple,
                purple: colors.purple,
                green: colors.emerald,
                emerald: colors.emerald,
                red: colors.rose,
                rose: colors.rose,
                yellow: colors.amber,
                amber: colors.amber,
            },
            boxShadow: {
                soft: '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
                glow: '0 0 15px 0 rgba(99, 102, 241, 0.3)',
                'glow-lg': '0 0 25px 0 rgba(99, 102, 241, 0.45)',
            },
            borderRadius: {
                none: '0',
                sm: '0.25rem',
                DEFAULT: '0.5rem',
                md: '0.5rem',
                lg: '0.75rem',
                xl: '1rem',
                '2xl': '1.25rem',
                full: '9999px',
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            transitionDuration: {
                250: '250ms',
            },
            borderColor: theme => ({
                default: theme('colors.neutral.600', '#1e293b'),
            }),
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ]
};
