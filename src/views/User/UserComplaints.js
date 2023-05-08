import {useSelector} from "react-redux";
import {useState} from "react";
import {DateHandler} from "../../utils/DateHandler";

export const UserComplaints = () => {

  const comps = [
    {
      id : 1,
      date : new Date(),
      office : 'Кинема, г.Казань',
      message : 'Меня не пустили на сеанс',
      answer : null
    },
    {
      id : 2,
      date : new Date(),
      office : 'Кинема, г.Казань',
      message : 'У вас грязно',
      answer : 'Просим прощеняи за неудобства'
    },
  ]

  const token = useSelector(state => state.auth.token);
  const [complaints, setCompliants] = useState(comps);


  return (
    complaints.length === 0
      ?
      <div className='flex justify-center w-full'>
        <p className='flex gap-1 font-light text-xl mt-20'>
          Жалоб пока нет. Мы рады, что Вы остаетесь довольными нашим обслуживанием.
        </p>
      </div>
      :
      <ul>
        {
          complaints.map(comp => (
            <li key={comp.id} className='flex flex-col p-3 border-b'>
              <p className='flex'><p className='font-semibold'>Дата</p> : {comp.date.getDate()}.{('0' + (1 + comp.date.getMonth() )).slice(-2)}.{comp.date.getFullYear()}</p>
              <p className='flex'><p className='font-semibold'>Филиал</p> : {comp.office}</p>
              <p className='flex'><p className='font-semibold'>Текст жалобы</p> : {comp.message}</p>
              <p className='flex'><p className='font-semibold'>Ответ</p> : {comp.answer ??  ''}</p>
            </li>
          ))
        }
      </ul>
  )
}