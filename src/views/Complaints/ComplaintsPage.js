import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export const ComplaintsPage = () => {
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);


  const ForUnauthorized = () => (
    <div className='flex justify-center w-full'>
      <p className='flex gap-1 font-light text-xl mt-20'>
        Для оставления жалобы
        <Link to="/authorization" className='text-gray-400 hover:text-black hover:underline'>авторизуйтесь</Link>
      </p>
    </div>
  )

  const ForStaff = () => (
    <div className='flex justify-center w-full'>
      <p className='flex gap-1 font-light text-xl mt-20'>
        Данный раздел предназначен для посетителей
      </p>
    </div>
  )

  return(
    token === ''
    ? <ForUnauthorized/>
    : role === 'Client'
      ? <div/>
      : <ForStaff/>
  )
}