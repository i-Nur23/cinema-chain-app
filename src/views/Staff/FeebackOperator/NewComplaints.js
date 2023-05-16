import {useEffect, useState} from "react";
import {OperatorAPI} from "../../../api/OperatorAPI";
import {ComplaintsAPI} from "../../../api/ComplaintsAPI";
import {useSelector} from "react-redux";

export const NewComplaints = () => {

  const token = useSelector(state => state.auth.token);

  const [complaints, setComplaints] = useState([])



  useEffect(() => {
    ComplaintsAPI.getActiveComplaints(token)
      .then(complaints => setComplaints(complaints))
  },[])


  const Complaint = ({complaint}) => {

    const [answer, setAnswer] = useState('');

    const date = new Date(complaint.createDate);

    const saveAnswer = async () => {
      OperatorAPI.writeAnswer(complaint.id, answer, token)
        .then(_ => ComplaintsAPI.getActiveComplaints(token)
          .then(complaints => setComplaints(complaints)))
    }

    return (
      <div key={complaint.id} className='flex flex-col p-3 mb-8'>
        <div className='flex flex-col'>
          <div className='border border-b-0 rounded-t-lg p-3 border-gray-400'>
            <p className='flex'><p className='font-semibold'>Дата</p> : {date.getDate()}.{('0' + (1 + date.getMonth() )).slice(-2)}.{date.getFullYear()}</p>
            <p className='flex'><p className='font-semibold'>Филиал</p> : {complaint.branchOfficeName != null ? `${complaint.branchOfficeName}, г. ${complaint.branchOfficeCity}` : 'Вся сеть'}</p>
            <p className='flex'><p className='font-semibold'>Текст жалобы</p> : {complaint.description}</p>
          </div>
          <textarea
            className='resize-none h-56 border border-gray-400 focus:ring-0 focus:border-gray-400'
            placeholder='Ответ'
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button className='border border-t-0 rounded-b-lg border-gray-400 p-3 рщмук:bg-gray-100' onClick={saveAnswer }>
            Сохранить
          </button>
        </div>
      </div>
    )
  }


  return(
    complaints.length === 0
      ?
      <div className='flex justify-center w-full'>
        <p className='flex gap-1 font-light text-lg'>
          Новых жалоб пока нет.
        </p>
      </div>
      :
      <div className='w-full'>
        <center className='text-lg'>Жалобы</center>
        <div className='grid grid-cols-2 gap-6 w-full'>
          {
            complaints.map(comp => <Complaint complaint={comp}/>)
          }
        </div>
      </div>
  )
}