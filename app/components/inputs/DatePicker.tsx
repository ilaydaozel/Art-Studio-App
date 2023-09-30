import { COLORS } from '@/constants/colors';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface DatePickerProps {
  id: string;
  label: string;
  disabled?: boolean;
  width?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const DatePicker = ({
  id,
  label,
  disabled,
  width = '100%',
  register,
  required,
  errors,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = event.target.value;
    setSelectedDate(selectedDateString);
  };

  return (
    <div style={{ width: width }} className='relative py-2'>
      <input
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
        type='date'
        value={formatDate(selectedDate ? new Date(selectedDate) : null)}
        onChange={handleDateChange}
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

export default DatePicker;
