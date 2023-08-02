'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import AuthSocialButton from './AuthSocialButton';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/users');
        }
    }, [session.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            axios
                .post('/api/register', data)
                .then(() => {
                    toast.success('Success Register');
                    signIn('credentials', data);
                })
                .catch((e) => {
                    toast.error('Something went wrong');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        if (variant === 'LOGIN') {
            // NextAuth SignIn
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials');
                    }
                    if (callback?.ok && !callback.error) {
                        toast.success('Logged in!');
                        router.push('/users');
                    }
                })
                .catch(() => {
                    toast.error('asdasd');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, { redirect: false })
            .then((callback) => {
                toast.success('logged in');
                if (callback?.error) {
                    toast.error('invalid credentials');
                }
                if (callback?.ok && !callback.error) {
                    toast.success('Logged in!');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        // NextAuth social signin
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input
                            label="Name"
                            id="name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        label="Email address"
                        id="email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        label="Password"
                        id="password"
                        register={register}
                        type="password"
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button disabled={isLoading} fullwidth type="submit">
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className=" mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center ">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or countinue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            onClick={() => socialAction('github')}
                            icon={BsGithub}
                        />
                        <AuthSocialButton
                            onClick={() => socialAction('google')}
                            icon={BsGoogle}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN'
                            ? 'New to Messenger?'
                            : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN'
                            ? 'Create an account'
                            : 'Login your account'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
