import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
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
}
