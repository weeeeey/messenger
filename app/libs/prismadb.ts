import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;

// import { PrismaClient } from '@prisma/client'
//
// const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
