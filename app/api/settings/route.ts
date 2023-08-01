import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const body = await req.json();
        const { name, image } = body;

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                image,
            },
        });
        return NextResponse.json(updateUser);
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
