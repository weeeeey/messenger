'use client';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import React from 'react';
import MobileItem from './MobileItem';

const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }
    return (
        <div className="fixed justify-between flex flex-row items-center bg-white borer-t-[1px] z-40 bottom-0 w-full lg:hidden">
            {routes.map((item) => (
                <MobileItem
                    key={item.label}
                    href={item.href}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                />
            ))}
        </div>
    );
};

export default MobileFooter;
