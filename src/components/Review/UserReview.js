import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ReviewAPI} from "../../api/ReviewAPI";
import {StarMark} from "./StarMark";

export const UserReview = ({filmId, refresh, token, review}) => {

  const refs = Array.from({length: 10}, (_, i) => React.createRef())

  const navigate = useNavigate()
  const [mark, setMark] = useState(0);
  const [oldMark, setOldMark] = useState(0);
  const [descr, setDescr] = useState("");
  const [oldDescr, setOldDescr] = useState(0);
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setMark(review.value);
    setOldMark(review.value)
    setDescr(review.description);
    setOldDescr(review.description);

    for (let j = 0; j < review.value; j++){
      refs[j].current.setFill()
    }

    for (let j = review.value; j < 10; j++){
      refs[j].current.setFill("none")
    }

  },[])

  const setFilled = (index) => {

    if (disabled) return;

    for (let i = 0; i <= index; i++){
      refs[i].current.setFill();
    }

    for (let i = index + 1; i < 10; i++){
      refs[i].current.setFill("none");
    }
  }

  const clearStars = () => {

    if (disabled) return;

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
      setOldMark(mark);
      setOldDescr(descr);
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

  function setAllOld() {
    setMark(oldMark);
    setDescr(oldDescr);


    for (let j = 0; j < oldMark; j++){
      refs[j].current.setFill()
    }

    for (let j = oldMark; j < 10; j++){
      refs[j].current.setFill("none")
    }
  }

  return(
    <div className='mt-4 rounded-lg   shadow-gray-400 p-3'>
      <p className='text-lg mb-5'>Ваш отзыв</p>
      <div className='flex justify-between'
           onMouseLeave = {() => clearStars()}
           aria-disabled={disabled}
      >
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
        disabled={disabled}
        placeholder="Напишите ваше мнение"
        className='h-24 my-4 border-gray-200 resize-none rounded-lg focus:outline-none focus:ring-0 w-full focus:border-gray-400'
      />
      <div className='flex justify-end'>
        {
          disabled
            ?
            <button
              className='p-3 bg-cyan-700 rounded-lg text-white hover:bg-cyan-800'
              onClick={() => {
                setDisabled(false);
              }}
            >
              Изменить
            </button>
            :
            <div className='flex gap-3'>
              <button
                className='p-3 bg-gray-800 rounded-lg text-white hover:bg-black'
                onClick={() => {
                  setAllOld();
                  setDisabled(true);
                }}
              >
                Отмена
              </button>
              <button
                className='p-3 bg-cyan-700 rounded-lg text-white hover:bg-cyan-800'
                onClick={() => {
                  SaveReview()
                  setDisabled(true)
                }}
              >
                Сохранить
              </button>
            </div>
        }
      </div>
    </div>
  )
}