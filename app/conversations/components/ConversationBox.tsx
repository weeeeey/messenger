'use client';
import React, { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import clsx from 'clsx';

import { FullConversationType } from '@/app/types';
import { Conversation, User, Message } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';

interface ConversationBoxProps {
    data: FullConversationType;
    seleted?: boolean;
}

const ConversationBox = ({ data, seleted }: ConversationBoxProps) => {
    const otherUsers = useOtherUser(data);

    return <div>ConversationBox</div>;
};

export default ConversationBox;
