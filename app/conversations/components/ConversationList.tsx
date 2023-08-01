'use client';

import { MdOutlineGroupAdd } from 'react-icons/md';

import React, { useState } from 'react';

import { FullConversationType } from '@/app/types';
import { useRouter } from 'next/navigation';
import useConversation from '@/app/hooks/useConversation';
import clsx from 'clsx';
import ConversationBox from './ConversationBox';
import Button from '@/app/components/Button';
import axios from 'axios';
import Modal from '@/app/components/modals/Modal';
import GroupChatModal from '@/app/components/modals/GroupChatModal';
import { User } from '@prisma/client';

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            />
            <aside
                className={clsx(
                    `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}
            >
                <div className="px-5">
                    <div className="flex flex-row justify-between mb-4 pt-4 ">
                        <div className="text-2xl font-bold text-neutral-800">
                            Message
                        </div>
                        <div
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer transition hover:opacity-75"
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            seleted={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    );
};

export default ConversationList;
