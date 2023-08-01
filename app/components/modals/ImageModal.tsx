'use client';

import React from 'react';
import Modal from './Modal';
import Image from 'next/image';

type ImageModalProps = {
    src?: string | null;
    isOpen?: boolean;
    onClose: () => void;
};

const ImageModal = ({ onClose, src, isOpen }: ImageModalProps) => {
    if (!src) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <Image src={src} alt="Clicked Imgae" width={640} height={640} />
            </div>
        </Modal>
    );
};

export default ImageModal;
