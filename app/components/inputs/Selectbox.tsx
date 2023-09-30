'use client';

import { COLORS } from '@/constants/colors';
import { useState, useEffect } from 'react';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';

interface SelectboxProps {
  id: string;
  label: string;
  choices: string[];
  type?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Selectbox = ({
  id,
  label,
  choices,
  width = '100%',
  disabled,
  register,
  required,
  errors,
}: SelectboxProps) => {
  const [selectOptions, setSelectOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const updatedSelectOptions = choices.map((choice) => ({
      value: choice,
      label: choice,
    }));
    setSelectOptions(updatedSelectOptions);
  }, [choices]);

  return (
    <div style={{ width: width }} className='relative py-2'>
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
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
      >
        <option value='' disabled hidden></option>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
          z-10 
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

export default Selectbox;
