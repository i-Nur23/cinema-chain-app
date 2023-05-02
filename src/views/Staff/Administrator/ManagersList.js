import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {AcceptActionDialog} from "../../../components/Dialogs";
import {ManagerAPI} from "../../../api/ManagerAPI";

export const ManagersList = () => {
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);
  const [deletingManager, setDeletingManager] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const token = useSelector(state => state.auth.token);

  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          const resData = await ManagerAPI.GetAllManagers(token);
          setManagers(resData.managerList);
          setLoaded(true)
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  return loaded && (
  <div>
    <center className='my-5 text-xl font-semibold'>Менеджеры сети</center>
    <ul>
      {
        managers.map(manager =>
          <li className="p-3 border-b">
            <div className='flex justify-between'>
              <div>
                <p className='text-lg'>{manager.lastName} {manager.firstName}</p>
                {/*<p className='text-gray-400'>{manager.city}</p>*/}
              </div>
              <div className='flex gap-5'>
                <Link to={`/staff/main/new_manager/${manager.id}`} className='hover:text-blue-500 my-auto'>
                  <PencilSquareIcon className='w-6 h-6 my-auto'/>
                </Link>
                <XMarkIcon
                  className='w-6 h-6 my-auto cursor-pointer hover:text-red-500'
                  onClick={() => {
                    setDeletingManager(manager);
                    setOpen(true);
                  }}
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
      message={`Вы уверены, что ходите удалить из системы менеджера: ${deletingManager?.lastName} ${deletingManager?.firstName}?`}
      action={() => {
        ManagerAPI.RemoveManager(deletingManager.id, token)
          .then(_ => ManagerAPI.GetAllManagers(token)
            .then(resData => {
              setManagers(resData.managerList);
              close()
            }));
      }}
    />
  </div>
  )
}