import {
  HiArrowRight,
  HiArrowLeft,
  HiArrowUp,
  HiArrowDown,
} from 'react-icons/hi';

export const MovementKeysMenu = () => {
  return (
    <div className='relative'>
      <HiArrowUp
        id='iconUp'
        className='absolute md:bottom-10 bottom-8 md:left-10 left-8 p-1.5 bg-neutral-500 hover:bg-neutral-700 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />
      <HiArrowDown
        id='iconDown'
        className='absolute bottom-0 left-10 p-1.5 bg-neutral-500 hover:bg-neutral-700 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />
      <HiArrowRight
        id='iconRight'
        className='absolute md:left-20 left-16 bottom-0 p-1.5 bg-neutral-500 hover:bg-neutral-700 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />

      <HiArrowLeft
        id='iconLeft'
        className='absolute left-0 bottom-0 p-1.5 bg-neutral-500 hover:bg-neutral-700 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />
    </div>
  );
};
