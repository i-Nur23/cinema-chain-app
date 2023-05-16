import {useEffect, useState} from "react";
import {ComplaintsAPI} from "../../../api/ComplaintsAPI";
import {useSelector} from "react-redux";

export const AllComplaints = () => {

  const token = useSelector(state => state.auth.token);

  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    ComplaintsAPI.getAllComplaints(token)
      .then(complaints => setComplaints(complaints))
  },[])

  return(
    complaints.length === 0
      ?
      <div className='flex justify-center w-full'>
        <p className='flex gap-1 font-light text-lg'>
          Жалоб нет.
        </p>
      </div>
      :
      <div>
        <center className='text-lg'>Жалобы</center>
        <ul>
          {
            complaints.map(comp => {

              const date = new Date(comp.createDate);

              return (
                <li key={comp.id} className='flex flex-col p-3 border-b'>
                  <p className='flex'><p
                    className='font-semibold'>Дата</p> : {date.getDate()}.{('0' + (1 + date.getMonth())).slice(-2)}.{date.getFullYear()}
                  </p>
                  <p className='flex'><p className='font-semibold'>Филиал</p> : {comp.branchOfficeName != null ? `${comp.branchOfficeName}, г. ${comp.branchOfficeCity}` : 'Вся сеть'}</p>
                  <p className='flex'><p className='font-semibold'>Текст жалобы</p> : {comp.description}</p>
                  <p className='flex'><p className='font-semibold'>Ответ</p> : {comp.answer ?? ''}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
  )
}