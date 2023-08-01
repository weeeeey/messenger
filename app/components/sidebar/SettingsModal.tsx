'use client';

import React, { useState } from 'react';
import { User } from '@prisma/client';
import Modal from '../modals/Modal';
import { useRouter } from 'next/navigation';
import {
    FieldValue,
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Input from '../inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';

interface SettingsModalProps {
    currentUser: User;
    isOpen?: boolean;
    onClose: () => void;
}

const SettingsModal = ({
    currentUser,
    isOpen,
    onClose,
}: SettingsModalProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name,
            image: currentUser.image,
        },
    });
    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(handleUpload)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12 ">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 ">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600 ">
                            Edit your public information
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8 ">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex flex-row items-center gap-x-3">
                                    <Image
                                        src={
                                            image ||
                                            currentUser.image ||
                                            '/images/placeholder.jpg'
                                        }
                                        alt="Avatar"
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="s6ah349n"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            <div className="bg-slate-300 hover:bg-slate-400 rounded-full px-2 py-1">
                                                Change
                                            </div>
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-row items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancle
                        </Button>

                        <Button
                            disabled={isLoading}
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;
