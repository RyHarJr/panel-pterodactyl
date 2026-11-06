import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';
import styled from 'styled-components/macro';

export type FlashMessageType = 'success' | 'info' | 'warning' | 'error';

interface Props {
    title?: string;
    children: string;
    type?: FlashMessageType;
}

const styling = (type?: FlashMessageType): TwStyle | string => {
    switch (type) {
        case 'error':
            return tw`bg-rose-500/10 border-rose-500/40 text-rose-200`;
        case 'info':
            return tw`bg-primary-500/10 border-primary-500/40 text-primary-200`;
        case 'success':
            return tw`bg-emerald-500/10 border-emerald-500/40 text-emerald-200`;
        case 'warning':
            return tw`bg-amber-500/10 border-amber-500/40 text-amber-200`;
        default:
            return '';
    }
};

const getBackground = (type?: FlashMessageType): TwStyle | string => {
    switch (type) {
        case 'error':
            return tw`bg-rose-600 text-white`;
        case 'info':
            return tw`bg-primary-600 text-white`;
        case 'success':
            return tw`bg-emerald-600 text-white`;
        case 'warning':
            return tw`bg-amber-600 text-white`;
        default:
            return '';
    }
};

const Container = styled.div<{ $type?: FlashMessageType }>`
    ${tw`p-3 border items-center leading-normal rounded-xl shadow-soft flex w-full text-sm`};
    ${(props) => styling(props.$type)};
`;
Container.displayName = 'MessageBox.Container';

const MessageBox = ({ title, children, type }: Props) => (
    <Container css={tw`lg:inline-flex`} $type={type} role={'alert'}>
        {title && (
            <span
                className={'title'}
                css={[
                    tw`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 leading-none`,
                    getBackground(type),
                ]}
            >
                {title}
            </span>
        )}
        <span css={tw`mr-2 text-left flex-auto`}>{children}</span>
    </Container>
);
MessageBox.displayName = 'MessageBox';

export default MessageBox;
