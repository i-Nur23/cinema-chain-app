import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {OperatorAPI} from "../../../api/OperatorAPI";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {AcceptActionDialog} from "../../../components/Dialogs";

export const OperatorsList = () => {
  const navigate = useNavigate();

  const [operators, setOperators] = useState([]);
  const [deletingOperator, setDeletingOperator] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const token = useSelector(state => state.auth.token);

  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          const opers = await OperatorAPI.getAllOperators(token);
          setOperators(opers);
          setLoaded(true)
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  return loaded && (
    <div>
      <center className='my-5 text-xl font-semibold'>Операторы обратной связи</center>
      <ul>
        {
          operators.map(operator =>
            <li className="p-3 border-b">
              <div className='flex justify-between'>
                <div>
                  <p className='text-lg'>{operator.lastName} {operator.firstName}</p>
                </div>
                <div className='flex gap-5'>
                  <Link to={`/staff/main/new_operator/${operator.id}`} className='hover:text-blue-500 my-auto'>
                    <PencilSquareIcon className='w-6 h-6 my-auto'/>
                  </Link>
                  <XMarkIcon
                    className='w-6 h-6 my-auto cursor-pointer hover:text-red-500'
                    onClick={() => {
                      setDeletingOperator(operator);
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
        message={`Вы уверены, что ходите удалить из системы оператора обратной связи: ${deletingOperator?.lastName} ${deletingOperator?.firstName}?`}
        action={() => {
          OperatorAPI.deleteOperator(deletingOperator.id, token)
            .then(_ => OperatorAPI.getAllOperators(token)
              .then(operatorsList => {
                setOperators(operatorsList);
                close();
              }));
        }}
      />
    </div>
  )
}