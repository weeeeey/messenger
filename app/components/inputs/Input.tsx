import clsx from 'clsx';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    useForm,
} from 'react-hook-form';

const reg = {
    name: {
        pattern: /^[a-zA-Z]+$/,
        minLength: 2,
        maxLength: 8,
    },
    email: {
        pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        minLength: 4,
        maxLength: 30,
    },
    password: {
        pattern:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,16}$/,
        minLength: 8,
        maxLength: 15,
    },
};
interface InputProps {
    label: string;
    id: 'name' | 'email' | 'password';
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
    const { maxLength, minLength, pattern } = reg[id];
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2 ">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    className={clsx(
                        `
                    form-input
                    block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6
                    `,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                    {...register(id, {
                        required,
                        maxLength,
                        minLength,
                        pattern,
                    })}
                />
            </div>
        </div>
    );
};

export default Input;
