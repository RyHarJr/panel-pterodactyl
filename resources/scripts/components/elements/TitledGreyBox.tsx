import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tw from 'twin.macro';
import isEqual from 'react-fast-compare';

interface Props {
    icon?: IconProp;
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const TitledGreyBox = ({ icon, title, children, className }: Props) => (
    <div css={tw`rounded-xl shadow-soft bg-neutral-700 border border-neutral-600/40 overflow-hidden`} className={className}>
        <div css={tw`bg-neutral-900/80 px-4 py-3 border-b border-neutral-600/50 flex items-center`}>
            {typeof title === 'string' ? (
                <p css={tw`text-sm font-semibold tracking-wide text-neutral-200 uppercase`}>
                    {icon && <FontAwesomeIcon icon={icon} css={tw`mr-2 text-primary-400`} />}
                    {title}
                </p>
            ) : (
                title
            )}
        </div>
        <div css={tw`p-4`}>{children}</div>
    </div>
);

export default memo(TitledGreyBox, isEqual);
