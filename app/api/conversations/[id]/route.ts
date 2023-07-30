import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParam {
    conversationId: string;
}

export async function POST(request: Request, { param }: { param: IParam }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return;
    }
    const { conversationId } = param;
    const { body, userId } = request.json();
    const message = await prisma.message.create({
        data: {
            senderId: userId,
            conversationId,
            body,
        },
    });
}
