'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from '../../../(site)/components/MessageBox';
import axios from 'axios';

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    data={message}
                    key={message.id}
                />
            ))}
            <div ref={bottomRef} className="pt-24"></div>
        </div>
    );
};

export default Body;
