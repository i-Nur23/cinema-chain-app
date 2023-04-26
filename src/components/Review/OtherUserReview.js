import {useEffect, useState} from "react";

export const OtherUserReview = ({review}) => {

  return(
    <div className='rounded-lg border shadow shadow-gray-400 divide-y p-3 mb-4'>
      <div className='flex justify-between'>
        <p className='text-lg flex gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 my-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          {review.userNickName}
        </p>
        <p className={`text-xl opacity-80 drop-shadow-2xl ${review.value < 5 ? 'text-red-600' : review.value > 6 ? 'text-green-700' : 'text-yellow-300'}`}>
          {review.value}
        </p>
      </div>
      <div>
        <div className='my-3'>
          {review.description}
        </div>
        <p className='text-sm text-gray-400'>
          {('0' + new Date(review.changeDate).getDate() ).slice(-2)}.{('0' + (new Date(review.changeDate).getMonth() + 1) ).slice(-2)}.{ new Date (review.changeDate).getFullYear()}
        </p>
      </div>
    </div>
  )
}
