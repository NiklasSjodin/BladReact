export const CardSkeleton = () => (
    <div className='flex-shrink-0 w-48 m-2'>
        <div className='aspect-[2/3]'>
            <div className='w-full h-full rounded-lg bg-gray-800 animate-pulse' />
        </div>
        <div className='mt-2 space-y-2'>
            <div className='h-4 bg-gray-800 rounded animate-pulse' />
            <div className='h-3 w-2/3 bg-gray-800 rounded animate-pulse' />
        </div>
    </div>
); 