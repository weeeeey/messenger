import React from 'react';

import clsx from 'clsx';
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullwidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button = ({
    children,
    fullwidth,
    type,
    danger,
    disabled,
    onClick,
    secondary,
}: ButtonProps) => {
    return (
        <div>
            <button
                onClick={onClick}
                type={type}
                disabled={disabled}
                className={clsx(
                    `flex justify-center rounded-md px-2 py-2 
                text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            `,
                    disabled && 'opacity-50 cursor-default',
                    fullwidth && 'w-full',
                    danger &&
                        'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                    secondary ? 'text-gray-900' : 'text-white',
                    !secondary &&
                        !danger &&
                        'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
                )}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;
