import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { User } from '@prisma/client';
import { FullConversationType } from '../types';

const useOtherUser = (conversation: FullConversationType) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;
        const otherUser = conversation?.users.filter(
            (user) => user.email !== currentUserEmail
        );
        return otherUser;
    }, [conversation, session.data?.user]);

    return otherUser;
};

export default useOtherUser;
