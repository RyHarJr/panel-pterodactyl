import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-xl no-underline text-neutral-200 items-center bg-neutral-700 p-4 border border-neutral-600/40 shadow-soft transition-all duration-200 overflow-hidden`};

    ${(props) => props.$hoverable !== false && tw`hover:border-neutral-500/70 hover:bg-neutral-700/90 hover:shadow-md`};

    & .icon {
        ${tw`rounded-xl w-14 h-14 flex items-center justify-center bg-neutral-600/70 p-3 text-neutral-300 shadow-inner`};
    }
`;
