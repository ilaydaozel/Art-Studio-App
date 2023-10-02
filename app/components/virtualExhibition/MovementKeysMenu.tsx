import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from 'react-icons/bs';

export const MovementKeysMenu = () => {
  return (
    <div className='relative'>
      <BsFillArrowUpSquareFill
        id='up-icon'
        className='absolute md:bottom-10 bottom-8 md:left-10 left-8 text-neutral-500 hover:text-neutral-700 opacity-50 md:w-8 w-6 md:h-8 h-6'
      />
      <BsFillArrowDownSquareFill
        id='down-icon'
        className='absolute bottom-0 md:left-10 left-8 text-neutral-500 hover:text-neutral-700 opacity-50 md:w-8 w-6 md:h-8 h-6'
      />
      <BsFillArrowRightSquareFill
        id='right-icon'
        className='absolute md:left-20 left-16 bottom-0 text-neutral-500 hover:text-neutral-700 opacity-50 md:w-8 w-6 md:h-8 h-6'
      />
      <BsFillArrowLeftSquareFill
        id='left-icon'
        className='absolute left-0 bottom-0 text-neutral-500 hover:text-neutral-700 opacity-50 md:w-8 w-6 md:h-8 h-6'
      />
    </div>
  );
};
