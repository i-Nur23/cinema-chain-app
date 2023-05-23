import {StarMark} from "./StarMark";
import React, {useState} from "react";
import {ReviewAPI} from "../../api/ReviewAPI";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export const UserEmptyReview = ({filmId, refresh, token}) => {

  const refs = Array.from({length: 10}, (_, i) => React.createRef())

  const navigate = useNavigate()
  const [mark, setMark] = useState(0);
  const [descr, setDescr] = useState("");

  const setFilled = (index) => {
    for (let i = 0; i <= index; i++){
      refs[i].current.setFill();
    }

    for (let i = index + 1; i < 10; i++){
      refs[i].current.setFill("none");
    }
  }

  const clearStars = () => {

    for (let j = 0; j < mark; j++){
      refs[j].current.setFill()
    }

    for (let j = mark; j < 10; j++){
      refs[j].current.setFill("none")
    }
  }

  const SaveReview = async () => {
    const resData = await ReviewAPI.PostUpdateReview(filmId, mark, descr, token)

    if (resData.ok){
      refresh();
    } else if (resData.status === 401) {
      navigate('/authorization', {
        state : {
          reason : 2,
          message : 'Авторизуйтесь для оставления отзыва',
          after : `/films/${filmId}/info`,
          filmId : filmId,
          value : mark,
          description : descr
        }
      })
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
              choose={(mark) => setMark(mark)}
            />
          )
        }
      </div>
      <textarea
        value={descr}
        onChange={e => setDescr(e.target.value)}
        placeholder="Напишите ваше мнение"
        className='h-24 my-4 border-gray-200 resize-none rounded-lg focus:outline-none focus:ring-0 w-full focus:border-gray-400'
      />
      <div className='flex justify-end'>
        <button
          className='p-3 bg-cyan-700 rounded-lg text-white hover:bg-cyan-800 disabled:bg-gray-500'
          disabled={mark == undefined}
          onClick={() => SaveReview()}
        >
          Оставить отзыв
        </button>
      </div>
    </div>
  )
}