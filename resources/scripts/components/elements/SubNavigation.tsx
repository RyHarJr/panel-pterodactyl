import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`w-full bg-neutral-900/80 backdrop-blur border-b border-neutral-700/60 shadow-sm overflow-x-auto`};

    & > div {
        ${tw`flex items-center text-sm w-full px-4 sm:px-6 lg:px-8`};

        & > a,
        & > div {
            ${tw`inline-block py-3 px-4 text-neutral-400 no-underline whitespace-nowrap font-medium transition-all duration-150`};

            &:not(:first-of-type) {
                ${tw`ml-1`};
            }

            &:hover {
                ${tw`text-white bg-neutral-800/40 rounded-t`};
            }

            &:active,
            &.active {
                ${tw`text-primary-400 font-semibold`};
                box-shadow: inset 0 -2px ${theme`colors.primary.500`.toString()};
            }
        }
    }
`;

export default SubNavigation;
