'use client';
import { COLORS } from '@/constants/colors';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  width?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type = 'text',
  width = '100%',
  disabled,
  register,
  required,
  errors,
}: InputProps) => {
  return (
    <div style={{ width: width }} className='relative py-2'>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        style={{
          color: COLORS.gray,
        }}
        className={`
        peer
        w-full
        p-1
        pt-6 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        pl-4
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
      />
      <label
        style={{
          color: COLORS.darkGray,
        }}
        className={`
        absolute 
        text-md
        duration-150 
        transform 
        -translate-y-3 
        top-5 
        z-8
        origin-[0] 
        left-4        
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
