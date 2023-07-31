import { User } from '@prisma/client';
import React from 'react';

interface AvatarGroupProps {
    users: User[];
}

const AvatarGroup = ({ users }: AvatarGroupProps) => {
    return <div>AvatarGroup</div>;
};

export default AvatarGroup;
