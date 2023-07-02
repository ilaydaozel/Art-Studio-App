'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const UserMenuElement = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className='
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
        whitespace-nowrap
      '
    >
      {label}
    </div>
  );
};

export default UserMenuElement;
