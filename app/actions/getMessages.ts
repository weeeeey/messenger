import prisma from '../libs/prismadb';

const getMessages = async (consversationId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: consversationId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return messages;
    } catch (error) {
        return [];
    }
};

export default getMessages;
