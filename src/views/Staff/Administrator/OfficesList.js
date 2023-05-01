import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { OfficesAPI } from "../../../api";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import {AcceptActionDialog} from "../../../components/Dialogs";

export const OfficesList = () => {
  const navigate = useNavigate();

  const [offices, setOffices] = useState([]);
  const [deletingOffice, setDeletingOffice] = useState(null);
  const [open, setOpen] = useState(false);
  const token = useSelector(state => state.auth.token);

  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          const resData = await OfficesAPI.getAllOfficesLite(token);
          setOffices(resData.officeList);
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  return (
    <div>
      <center className='my-5 text-xl font-semibold'>Филиалы сети</center>
      <ul>
        {
          offices.map(office =>
            <li className="p-3 border-b">
              <div className='flex justify-between'>
                <div>
                  <p className='text-lg'>{office.name}</p>
                  <p className='text-gray-400'>{office.city}</p>
                </div>
                <div className='flex gap-5'>
                  <Link to={`/staff/main/new_branch_office/${office.id}`} className='hover:text-blue-500 my-auto'>
                    <PencilSquareIcon className='w-6 h-6 my-auto' />
                  </Link>
                  <XMarkIcon
                    className='w-6 h-6 my-auto cursor-pointer hover:text-red-500'
                    onClick={() => {
                      setDeletingOffice(office);
                      setOpen(true);
                    } }
                  />
                </div>
              </div>
            </li>
          )
        }
      </ul>
      <AcceptActionDialog
        isOpen={open}
        close={() => close()}
        message={`Вы уверены, что ходите удалить из системы кинотеатр ${deletingOffice?.name} (г. ${deletingOffice?.city})`}
        action={() => {
          OfficesAPI.DeleteOffice(deletingOffice.id, token)
            .then(_ => OfficesAPI.getAllOfficesLite(token)
              .then(resData =>  { setOffices(resData.officeList); close() }));
        }}
      />
    </div>
  )
}