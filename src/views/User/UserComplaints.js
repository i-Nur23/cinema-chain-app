import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DateHandler} from "../../utils/DateHandler";
import {ComplaintsAPI} from "../../api/ComplaintsAPI";

export const UserComplaints = () => {

  const token = useSelector(state => state.auth.token);
  const [complaints, setCompliants] = useState([]);

  useEffect(() => {
    ComplaintsAPI.getUserComplaints(token)
      .then(complaints => setCompliants(complaints))
      .catch(err => {
        if (err.response.status === 401){
          console.log(err);
        }
      })
  },[])




  return (
    complaints.length === 0
      ?
      <div className='flex justify-center w-full'>
        <p className='flex gap-1 font-light text-lg mt-10'>
          Жалоб пока нет. Мы рады, что Вы остаетесь довольными нашим обслуживанием.
        </p>
      </div>
      :
      <ul>
        {
          complaints.map(comp => (
            <li key={comp.id} className='flex flex-col p-3 border-b'>
              <p className='flex'><p className='font-semibold'>Дата</p> : { new Date(comp.createDate).getDate()}.{('0' + (1 + new Date(comp.createDate).getMonth() )).slice(-2)}.{new Date(comp.createDate).getFullYear()}</p>
              <p className='flex'><p className='font-semibold'>Филиал</p> : {comp.branchOfficeName != null ? `${comp.branchOfficeName}, г. ${comp.branchOfficeCity}` : 'Вся сеть'}</p>
              <p className='flex'><p className='font-semibold'>Текст жалобы</p> : {comp.description}</p>
              <p className='flex'><p className='font-semibold'>Ответ</p> : {comp.answer ??  ''}</p>
            </li>
          ))
        }
      </ul>
  )
}