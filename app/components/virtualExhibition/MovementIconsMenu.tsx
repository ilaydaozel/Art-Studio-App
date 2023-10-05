import {
  GoChevronDown,
  GoChevronUp,
  GoChevronLeft,
  GoChevronRight,
} from 'react-icons/go';

const MovementIconsMenu = () => {
  return (
    <div className='relative'>
      <GoChevronUp
        id='iconUp'
        className='absolute md:bottom-10 bottom-8 md:left-10 left-8 p-1 hover:bg-slate-800 bg-slate-600 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />
      <GoChevronDown
        id='iconDown'
        className='absolute bottom-0 md:left-10 left-8 p-1 hover:bg-slate-800 bg-slate-600 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />
      <GoChevronRight
        id='iconRight'
        className='absolute md:left-20 left-16 bottom-0 p-1 hover:bg-slate-800 bg-slate-600 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />

      <GoChevronLeft
        id='iconLeft'
        className='absolute left-0 bottom-0 p-1 hover:bg-slate-800 bg-slate-600 opacity-50 text-neutral-100 rounded-md md:w-8 w-6 md:h-8 h-6'
      />
    </div>
  );
};
export default MovementIconsMenu;
