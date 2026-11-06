import { ExclamationIcon, ShieldExclamationIcon } from '@heroicons/react/outline';
import React from 'react';
import classNames from 'classnames';

interface AlertProps {
    type: 'warning' | 'danger';
    className?: string;
    children: React.ReactNode;
}

export default ({ type, className, children }: AlertProps) => {
    return (
        <div
            className={classNames(
                'flex items-center border border-l-4 rounded-xl shadow-soft px-4 py-3 text-sm',
                {
                    ['border-rose-500/40 border-l-rose-500 bg-rose-500/10 text-rose-200']: type === 'danger',
                    ['border-amber-500/40 border-l-amber-500 bg-amber-500/10 text-amber-200']: type === 'warning',
                },
                className
            )}
        >
            {type === 'danger' ? (
                <ShieldExclamationIcon className={'w-5 h-5 text-rose-400 mr-3 flex-shrink-0'} />
            ) : (
                <ExclamationIcon className={'w-5 h-5 text-amber-400 mr-3 flex-shrink-0'} />
            )}
            <div className={'flex-1'}>{children}</div>
        </div>
    );
};
