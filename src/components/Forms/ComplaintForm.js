import {useEffect, useState} from "react";
import {OfficesAPI} from "../../api";
import {SelectInput, SelectOfficeForComplaintStyle} from "../../components/MUIStyles";
import {MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ComplaintsAPI} from "../../api/ComplaintsAPI";

export const ComplaintForm = ({token}) => {

  const navigate = useNavigate();

  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState(0);
  const [message, setMessage] = useState('')

  const theatres = [
    {
      id : 0,
      name : 'Вся сеть',
      city : ''
    },
    {
      id : 1,
      name : 'Синема',
      city : 'Казань'
    },
    {
      id : 2,
      name : 'Кинема',
      city : 'Казань'
    },{
      id : 3,
      name : 'Синема-с',
      city : 'Москва'
    },
  ]

  useEffect(() => {
    /*OfficesAPI.getAllOfficesLite(token)
      .then();*/
    setOffices(theatres)
  },[])

  const saveComplaint = () => {
    ComplaintsAPI.createComplaint(message, officeId, token)
      .then(_ => navigate('/user/complaints'))
      .catch(err => console.log(err))
  }

  return(
    <div className='flex justify-center w-full'>
      <div className='mt-20 w-1/2 flex flex-col'>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          input={<SelectOfficeForComplaintStyle/>}
          value={officeId}
          onChange={(e) => setOfficeId(e.target.value)}
        >
          {
            offices.map(office =>
              <MenuItem value={office.id}>{`${office.name} ${office.id === 0 ? '' :  `, г.${office.city}`}`}</MenuItem>
            )
          }
        </Select>
        <textarea
          className='resize-none h-56 border border-gray-400 rounded-b-lg border-t-0 focus:ring-0 focus:border-gray-400'
          placeholder='Опишите ситуацию'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <div className='flex justify-end mt-5'>
          <button
            className='p-3 bg-cyan-800 text-white rounded-lg'
            onClick = {saveComplaint}
          >
            Сохранить
          </button>
        </div>

      </div>
    </div>
  )

}