import {useEffect, useState} from "react";
import {LoginForm} from "../../components/Forms/LoginForm";
import {VisitorRegForm} from "../../components/Forms/VisitorRegForm";
import {useLocation} from "react-router-dom";

export const VisitorAuthorization = () => {

  const [isLogin, setType] = useState(true)
  const [after, setAfter] = useState("/");

  const location = useLocation();

  useEffect(() => {
    if (location.state){
      setAfter(location.state.after);
    }
  },[])

  const changeType = () => {
    setType(!isLogin);
  }

  return(
    <div className='flex justify-center'>
      {isLogin ?
        <div className='m-auto w-4/12'>
          <LoginForm after={after}/>
          <div className="flex justify-between">
            <p>
              Ещё нет учетной записи?
            </p>
            <button className="underline" onClick={changeType}>
              Зарегестрироваться
            </button>
          </div>
        </div>
        :
        <VisitorRegForm onTypeChange={changeType} after={after}/>}
    </div>
  )
}