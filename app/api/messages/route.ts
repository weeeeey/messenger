import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getConversations from '@/app/actions/getConversations';
import useConversation from '@/app/hooks/useConversation';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Error('Login your account');
    }
    const body = await request.json();
    const { conversationId, text } = body;
    if (text.length === 0) {
        return new Error('Invalid message');
    }
    const message = await prisma.message.create({
        data: {
            body: text,
            conversationId,
            senderId: currentUser.id,
        },
    });
    return NextResponse.json(message);
}

interface IParams {
    userId: string;
}
