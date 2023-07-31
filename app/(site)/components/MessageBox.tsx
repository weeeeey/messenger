'use client';
import { FullMessageType } from '@/app/types';
import React from 'react';

interface MessageBoxProps {
    isLast: boolean;
    data: FullMessageType;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
    return <div>MessageBox</div>;
};

export default MessageBox;
