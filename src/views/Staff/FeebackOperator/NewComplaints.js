import {useEffect, useState} from "react";


const Complaint = ({complaint}) => {

  const [answer, setAnswer] = useState('');

  return (
    <div key={complaint.id} className='flex flex-col p-3 mb-8'>
      <div className='flex flex-col'>
        <div className='border border-b-0 rounded-t-lg p-3 border-gray-400'>
          <p className='flex'><p className='font-semibold'>Дата</p> : {complaint.date.getDate()}.{('0' + (1 + complaint.date.getMonth() )).slice(-2)}.{complaint.date.getFullYear()}</p>
          <p className='flex'><p className='font-semibold'>Филиал</p> : {complaint.office}</p>
          <p className='flex'><p className='font-semibold'>Текст жалобы</p> : {complaint.message}</p>
        </div>
        <textarea
          className='resize-none h-56 border border-gray-400 focus:ring-0 focus:border-gray-400'
          placeholder='Ответ'
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <button className='border border-t-0 rounded-b-lg border-gray-400 p-3 рщмук:bg-gray-100'>
          Сохранить
        </button>
      </div>
    </div>
  )
}

export const NewComplaints = () => {

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