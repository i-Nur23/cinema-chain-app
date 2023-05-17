import {useEffect, useState} from "react";
import {LoginForm} from "../../components/Forms/LoginForm";
import {VisitorRegForm} from "../../components/Forms/VisitorRegForm";
import {useLocation} from "react-router-dom";
import {BookingAPI} from "../../api/BookingAPI";
import {ReviewAPI} from "../../api/ReviewAPI";

export const VisitorAuthorization = () => {

  const [isLogin, setType] = useState(true)
  const [after, setAfter] = useState("/");
  const [seanceId, setSeanceId] = useState('');
  const [tickets, setTickets] = useState([]);
  const [action, setAction] = useState(() => async (token) => {console.log('default action')})

  const location = useLocation();

  let BookPlaces = async (token) => {console.log('default action')};


  useEffect(() => {
    if (location.state?.reason === 1) {
      setAfter(location.state.after);
      setAction(() => async (token) => {
        await BookingAPI.bookPlaces(location.state.seanceId, location.state.tickets, token);
      })
    }

    if (location.state?.reason === 2) {
      setAfter(location.state.after);
      setAction(() => async (token) => {
        await ReviewAPI.PostUpdateReview(location.state.filmId, location.state.value, location.state.description, token);
      })
    }
  },[]);

  const changeType = () => {
    setType(!isLogin);
  }

  return(
    <div className='flex justify-center'>
      {isLogin ?
        <div className='m-auto w-4/12'>
          <LoginForm after={after} action={action}/>
          <div className="flex justify-between">
            <p>
              Ещё нет учетной записи?
            </p>
            <button className="underline" onClick={changeType}>
              Зарегистрироваться
            </button>
          </div>
        </div>
        :
        <VisitorRegForm onTypeChange={changeType} after={after} action={action}/>}
    </div>
  )
}