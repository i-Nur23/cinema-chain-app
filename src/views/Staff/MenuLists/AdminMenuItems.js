import {useDispatch, useSelector} from "react-redux";
import {UserIcon} from "@heroicons/react/24/solid";
import {Link, useNavigate} from "react-router-dom";
import {unauthorize} from "../../../store/slicers/AuthSlicer";

export const AdminMenuItems = ({setClose}) => {

  const nickname = useSelector(state => state.auth.nickname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actions = [
      { name : 'Добавить филиал', url : 'new_branch_office'},
      { name : 'Список филиалов', url: 'branch_offices'},
      { name : 'Добавить фильм', url : 'new_film'},
      { name : 'Список фильмов', url : 'films'},
      { name : 'Актеры/Режиссеры', url: 'crew'},
      { name : 'Добавить менеджера', url : 'new_manager'},
      { name : 'Список менеджеров', url : 'managers'},
  ]

  return(
    <ul className='w-full'>
      <li className='flex gap-3 p-3'>
        <UserIcon className='w-4 h-4 my-auto'/>
        {nickname}
      </li>
      <hr/>
      {
        actions.map(action =>
          <li className='w-full p-3 cursor-pointer hover:bg-gray-100' onClick={() => {
            navigate(action.url);
            setClose();
          }}>
              {action.name}
          </li>)
      }
      <hr/>
      <li
        className='flex gap-3 p-3 text-red-800 cursor-pointer'
        onClick = { () => {
          dispatch(unauthorize());
          navigate('/staff');
        }}
      >
        Выход
        <span className="material-symbols-outlined">
          logout
        </span>
      </li>
    </ul>
  )
}