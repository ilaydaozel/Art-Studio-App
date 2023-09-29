interface RadioProps {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  width?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  id,
  label,
  value,
  checked,
  width = '100%',
  disabled,
  onChange,
}: RadioProps) => {
  return (
    <div style={{ width: width }} className='relative py-2'>
      <input
        type='radio'
        id={id}
        name={id}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`
          peer
          h-5 w-5
          mt-2
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-0 
          left-8
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
