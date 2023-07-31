import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
    conversationId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    try {
        const { conversationId } = params;
        if (!conversationId) {
            return new NextResponse();
        }
        const deleteConversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
            },
        });
        return NextResponse.json(deleteConversation);
    } catch (error) {
        console.error('Invalid conversation', { status: 401 });
        return new NextResponse();
    }
}
