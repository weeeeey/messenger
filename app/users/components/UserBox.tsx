'use client';

import Avatar from '@/app/components/Avatar';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { set } from 'react-hook-form';

interface UserBoxProps {
    data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        axios
            .post(`/api/conversations`, {
                conversationName: data.name,
                userId: data.id,
            })
            .then((res) => {
                router.push(`/conversations/${res.data.id}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [data, router]);

    return (
        <div
            className="w-full relative flex flex-row items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
            onClick={handleClick}
        >
            <Avatar user={data} />
            <div className="flex-1 min-w-0 ">
                <div className="focus:outline-none">
                    <div className="flex flex-row justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBox;
