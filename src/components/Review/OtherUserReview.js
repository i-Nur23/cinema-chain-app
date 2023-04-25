import {useEffect, useState} from "react";

export const OtherUserReview = ({review}) => {

  return(
    <div className='rounded-lg border shadow shadow-gray-400 divide-y'>
      <div className='flex justify-between'>
        <p>{review.userNickname}</p>
        <p className={`text-xl ${review.value < 5 ? 'text-red-600' : review.value > 6 ? 'text-green-700' : 'text-yellow-300'}`}>
          {review.value}
        </p>
      </div>
      <div>
        {review.description}
      </div>
      <p>{('0' + review.changeDate.getDate() ).slice(-2)}.{('0' + review.changeDate.getMonth() ).slice(-2)}.{review.changeDate.getFullYear()}</p>
    </div>
  )
}
