'use client';
import React, { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import clsx from 'clsx';

import { FullConversationType } from '@/app/types';
import { Conversation, User, Message } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { useRouter } from 'next/navigation';
import Avatar from '@/app/components/Avatar';

interface ConversationBoxProps {
    data: FullConversationType;
    seleted?: boolean;
}

const ConversationBox = ({ data, seleted }: ConversationBoxProps) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }
        const seenArray = lastMessage.seen || [];
        if (!userEmail) {
            return false;
        }
        return (
            seenArray.filter((user) => user.email === userEmail).length !== 0
        );
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent and Image';
        }
        if (lastMessage?.body) {
            return lastMessage.body;
        }
        return 'Started a conversation';
    }, [lastMessage]);
    return (
        <div
            onClick={handleClick}
            className={clsx(
                `w-full p-3 relative flex flex-row items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
                seleted ? 'bg-neutral-100' : 'bg-white'
            )}
        >
            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex flex-row justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900 ">
                            {data.name || otherUser.name}
                        </p>
                        {/* {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )} */}
                        {true && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(), 'p')}
                            </p>
                        )}
                    </div>
                    <p
                        className={clsx(
                            `truncate text-sm`,
                            hasSeen ? 'text-gray-500' : 'text-black font-medium'
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;