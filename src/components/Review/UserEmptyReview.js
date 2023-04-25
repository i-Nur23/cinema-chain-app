import {StarMark} from "./StarMark";
import React, {useState} from "react";

export const UserEmptyReview = () => {

  const refs = Array.from({length: 10}, (_, i) => React.createRef())

  const [mark, setMark] = useState();
  const [descr, setDescr] = useState("");

  const setFilled = (index) => {
    console.log(index)
    for (let i = 0; i <= index; i++){
      refs[i].current.setFill();
    }

    for (let i = index + 1; i < 10; i++){
      refs[i].current.setFill("none");
    }
  }

  const clearStars = () => {
    for (let j = 0; j < 10; j++){
      refs[j].current.setFill("none")
    }
  }


  return(
    <div className='mt-4 rounded-lg   shadow-gray-400 p-3'>
      <p className='text-lg mb-5'>Оставьте ваш отзыв</p>
      <div className='flex justify-between' onMouseLeave = {() => clearStars()}>
        {
          Array.from({length : 10}, (_, index) =>
            <StarMark
              index={index + 1}
              setFilled={(index) => setFilled(index)}
              clear={() => clearStars()}
              ref={refs[index]}
            />
          )
        }
      </div>
      <textarea
        placeholder="Напишите ваше мнение"
        className='my-4 border-gray-200 resize-none rounded-lg focus:outline-none focus:ring-0 w-full focus:border-gray-400'
      />
      <div className='flex justify-end'>
        <button className='p-3 bg-cyan-700 rounded-lg text-white hover:bg-cyan-800'>
          Оставить отзыв
        </button>
      </div>
    </div>
  )
}