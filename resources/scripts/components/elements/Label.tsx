import styled from 'styled-components/macro';
import tw from 'twin.macro';

const Label = styled.label<{ isLight?: boolean }>`
    ${tw`block text-xs uppercase tracking-wide font-medium text-neutral-300 mb-1.5`};
    ${(props) => props.isLight && tw`text-neutral-300`};
`;

export default Label;
