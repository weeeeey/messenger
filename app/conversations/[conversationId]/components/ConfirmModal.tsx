import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
    return <div>ConfirmModal</div>;
};

export default ConfirmModal;
