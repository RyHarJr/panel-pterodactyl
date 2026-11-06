import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <Container>
        {title && <h2 css={tw`text-2xl sm:text-3xl text-center text-white font-bold py-4 tracking-tight`}>{title}</h2>}
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <div css={tw`md:flex w-full bg-neutral-700/95 border border-neutral-600/50 shadow-soft rounded-2xl p-6 md:p-8 mx-1 backdrop-blur-xl`}>
                <div css={tw`flex-none select-none mb-6 md:mb-0 md:mr-6 self-center`}>
                    <img src={'/assets/svgs/pterodactyl.svg'} css={tw`block w-40 md:w-56 mx-auto opacity-90`} />
                </div>
                <div css={tw`flex-1`}>{props.children}</div>
            </div>
        </Form>
        <p css={tw`text-center text-neutral-500 text-xs mt-6`}>
            &copy; 2015 - {new Date().getFullYear()}&nbsp;
            <a
                rel={'noopener nofollow noreferrer'}
                href={'https://pterodactyl.io'}
                target={'_blank'}
                css={tw`no-underline text-neutral-400 hover:text-primary-400 transition-colors`}
            >
                Pterodactyl Software
            </a>
        </p>
    </Container>
));
