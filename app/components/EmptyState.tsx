'use client';

import useTranslate from '../hooks/useTranslate';

interface EmptyStateProps {
  item: string;
}

const EmptyState = ({ item }: EmptyStateProps) => {
  const t = useTranslate();
  return (
    <div
      className='
        h-[80vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      '
    >
      <div className='text-center'>
        <div className='text-2xl text-neutral-500'>
          {t(item, { element: 'empty_state' })}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
