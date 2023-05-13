import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export const BranchOfficeComplaints = () => {

  const officeId = useSelector(state => state.auth.branchOfficeId)

  const comps = [
    {
      id : 1,
      date : new Date(),
      office : 'Кинема, г.Казань',
      message : 'Меня не пустили на сеанс'
    },
    {
      id : 2,
      date : new Date(),
      office : 'Кинема, г.Казань',
      message : 'Меня не пустили на сеанс'
    },
    {
      id : 3,
      date : new Date(),
      office : 'Кинема, г.Казань',
      message : 'Меня не пустили на сеанс'
    }
  ]

  const [complaints, setComplaints] = useState(comps)

  useEffect(() => {

  },[])

  return(
    complaints.length === 0
      ?
      <div className='flex justify-center w-full'>
        <p className='flex gap-1 font-light text-xl mt-20'>
          Жалоб нет.
        </p>
      </div>
      :
      <div>
        <center className='text-lg'>Жалобы</center>
        <ul>
          {
            complaints.map(comp => (
              <li key={comp.id} className='flex flex-col p-3 border-b'>
                <p className='flex'><p
                  className='font-semibold'>Дата</p> : {comp.date.getDate()}.{('0' + (1 + comp.date.getMonth())).slice(-2)}.{comp.date.getFullYear()}
                </p>
                <p className='flex'><p className='font-semibold'>Филиал</p> : {comp.office}</p>
                <p className='flex'><p className='font-semibold'>Текст жалобы</p> : {comp.message}</p>
                <p className='flex'><p className='font-semibold'>Ответ</p> : {comp.answer ?? ''}</p>
              </li>
            ))
          }
        </ul>
      </div>
  )
}