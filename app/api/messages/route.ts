import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, image, conversationId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                seen: true,
                sender: true,
            },
        });
        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    },
                },
            },
        });

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('InternalError', { status: 500 });
    }

    // const currentUser = await getCurrentUser();
    // if (!currentUser) {
    //     return new Error('Login your account');
    // }
    // const body = await request.json();
    // const { conversationId, message } = body;
    // const messages = await prisma.message.create({
    //     data: {
    //         conversationId,
    //         senderId: currentUser.id,
    //         body: message,
    //     },
    // });
    // return NextResponse.json(messages);
}
