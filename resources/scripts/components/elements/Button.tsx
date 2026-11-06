import React from 'react';
import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';
import Spinner from '@/components/elements/Spinner';

interface Props {
    isLoading?: boolean;
    size?: 'xsmall' | 'small' | 'large' | 'xlarge';
    color?: 'green' | 'red' | 'primary' | 'grey';
    isSecondary?: boolean;
}

const ButtonStyle = styled.button<Omit<Props, 'isLoading'>>`
    ${tw`relative inline-flex items-center justify-center rounded-lg p-2 font-medium tracking-wide text-sm transition-all duration-150 border cursor-pointer`};

    ${(props) =>
        ((!props.isSecondary && !props.color) || props.color === 'primary') &&
        css<Props>`
            ${(props) => !props.isSecondary && tw`bg-primary-600 border-primary-500 border text-white shadow-soft`};

            &:hover:not(:disabled) {
                ${tw`bg-primary-500 border-primary-400`};
            }

            &:active:not(:disabled) {
                ${tw`bg-primary-700 border-primary-600`};
            }
        `};

    ${(props) =>
        props.color === 'grey' &&
        css`
            ${tw`border-neutral-600 bg-neutral-700 text-neutral-100`};

            &:hover:not(:disabled) {
                ${tw`bg-neutral-600 border-neutral-500`};
            }

            &:active:not(:disabled) {
                ${tw`bg-neutral-700 border-neutral-600`};
            }
        `};

    ${(props) =>
        props.color === 'green' &&
        css<Props>`
            ${tw`border-emerald-600 bg-emerald-600 text-white shadow-soft`};

            &:hover:not(:disabled) {
                ${tw`bg-emerald-500 border-emerald-500`};
            }

            &:active:not(:disabled) {
                ${tw`bg-emerald-700 border-emerald-600`};
            }

            ${(props) =>
                props.isSecondary &&
                css`
                    &:active:not(:disabled) {
                        ${tw`bg-emerald-600 border-emerald-700`};
                    }
                `};
        `};

    ${(props) =>
        props.color === 'red' &&
        css<Props>`
            ${tw`border-rose-600 bg-rose-600 text-white shadow-soft`};

            &:hover:not(:disabled) {
                ${tw`bg-rose-500 border-rose-500`};
            }

            &:active:not(:disabled) {
                ${tw`bg-rose-700 border-rose-600`};
            }

            ${(props) =>
                props.isSecondary &&
                css`
                    &:active:not(:disabled) {
                        ${tw`bg-rose-600 border-rose-700`};
                    }
                `};
        `};

    ${(props) => props.size === 'xsmall' && tw`px-2.5 py-1 text-xs rounded-md`};
    ${(props) => (!props.size || props.size === 'small') && tw`px-4 py-2 rounded-lg`};
    ${(props) => props.size === 'large' && tw`px-5 py-3 text-base rounded-xl`};
    ${(props) => props.size === 'xlarge' && tw`p-4 w-full text-base rounded-xl font-semibold shadow-soft`};

    ${(props) =>
        props.isSecondary &&
        css<Props>`
            ${tw`border-neutral-600/80 bg-neutral-800/60 text-neutral-200`};

            &:hover:not(:disabled) {
                ${tw`border-neutral-500 text-white bg-neutral-700/60`};
                ${(props) => props.color === 'red' && tw`bg-rose-600 border-rose-600 text-white`};
                ${(props) => props.color === 'primary' && tw`bg-primary-600 border-primary-600 text-white`};
                ${(props) => props.color === 'green' && tw`bg-emerald-600 border-emerald-600 text-white`};
            }
        `};

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`;

type ComponentProps = Omit<JSX.IntrinsicElements['button'], 'ref' | keyof Props> & Props;

const Button: React.FC<ComponentProps> = ({ children, isLoading, ...props }) => (
    <ButtonStyle {...props}>
        {isLoading && (
            <div css={tw`flex absolute justify-center items-center w-full h-full left-0 top-0`}>
                <Spinner size={'small'} />
            </div>
        )}
        <span css={isLoading ? tw`text-transparent` : undefined}>{children}</span>
    </ButtonStyle>
);

type LinkProps = Omit<JSX.IntrinsicElements['a'], 'ref' | keyof Props> & Props;

const LinkButton: React.FC<LinkProps> = (props) => <ButtonStyle as={'a'} {...props} />;

export { LinkButton, ButtonStyle };
export default Button;
