import { User } from '@prisma/client';

export type currentUser = Omit<User, 'createdAt' | ''>;

//     id: string;
//     name: string | null;
//     email: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//     hashedPassword: string | null;
//     createdAt: Date;
//     updatedAt: Date;
//     conversationIds: string[];
//     seenMessageIds: string[];
