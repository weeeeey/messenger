'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface MobileItemProps {
    icon: IconType;
    href: string;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link
            onClick={handleClick}
            href={href}
            className={clsx(
                `
                group flex flex-row gap-x-3 rounded-md p-4 justify-center text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 w-full
            `,
                active && 'bg-gray-100 text-black'
            )}
        >
            <Icon className="h-6 w-6" />
        </Link>
    );
};

export default MobileItem;
