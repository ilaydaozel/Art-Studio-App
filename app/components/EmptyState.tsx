'use client';
interface EmptyStateProps {
  title?: string;
}

const EmptyState = ({ title = 'No exact matches' }: EmptyStateProps) => {
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
        <div className='text-2xl font-bold'>{title}</div>
      </div>
    </div>
  );
};

export default EmptyState;
