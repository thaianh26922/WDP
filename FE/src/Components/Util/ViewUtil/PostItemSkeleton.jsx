import React from 'react';
import Skeleton from 'react-loading-skeleton';
function PostItemSkeleton({ card }) {
    const loadCards = Array(card).fill(1);
    return loadCards.map((_, i) => (
        <div className="border-solid border-2 rounded p-3" key={i}>
            <div className=''>
                <Skeleton className='py-3' />
            </div>
            <div>
                <Skeleton className='py-1 mt-4' />
            </div>
            <div className='py-2 mt-2'>
                <Skeleton className='w-2/5' />
                <Skeleton className='w-1/4' />
            </div>
            <div className='py-2 mt-2'>
                <Skeleton className='py-1 mt-2 w-3/5' />
            </div>
            <div className='py-3'>
                <Skeleton className='py-1' />
            </div>
            <div className='pt-2 pb-1 flex justify-between items-center'>
                <Skeleton className='px-14 py-3 rounded-md mr-4' />
                <Skeleton className='px-14 py-3 rounded-md mr-4' />
                <Skeleton className='px-3 py-1' />
            </div>
        </div>
    ))
}

export default PostItemSkeleton;