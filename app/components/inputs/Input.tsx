'use client';

import clsx from 'clsx';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    useForm,
} from 'react-hook-form';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}
const Input = ({
    errors,
    id,
    label,
    register,
    disabled,
    required,
    type,
}: InputProps) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 to-gray-900"
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
