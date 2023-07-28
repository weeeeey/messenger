import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import getCurrentUser from '@/app/actions/getCurrentUser';
import EmptyState from '../EmptyState';
interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar = async ({ children }: SidebarProps) => {
    const currentUser = await getCurrentUser();
    return (
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">{children}</main>
        </div>
    );
};

export default Sidebar;
