import {useEffect, useState} from "react";
import {OfficesAPI} from "../../api";

export const UserComplaints = ({token}) => {

  const [offices, setOffices] = useState([])

  useEffect(() => {
    OfficesAPI.getAllOfficesLite(token)
      .then();
  },[])

  return(
    <div className='flex justify-center w-full'>
      <div className='mt-20 w-3/5 border rounded-lg'>
        Данный раздел предназначен для посетителей
      </div>
    </div>
  )

}