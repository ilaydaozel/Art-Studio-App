interface RadioProps {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  id,
  label,
  value,
  checked,
  disabled,
  onChange,
}: RadioProps) => {
  return (
    <div className='relative py-2'>
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
          top-3 
          left-8
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
