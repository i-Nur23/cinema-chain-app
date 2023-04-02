import {useState} from "react";
import {LoginForm} from "../../components/Forms/LoginForm";
import {VisitorRegForm} from "../../components/Forms/VisitorRegForm";

export const VisitorAuthorization = () => {

  const [isLogin, setType] = useState(true)

  const changeType = () => {
    setType(!isLogin);
  }

  return(
    <div className='flex justify-center'>
      {isLogin ?
        <div className='m-auto w-4/12'>
          <LoginForm/>
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
        <VisitorRegForm onTypeChange={changeType}/>}
    </div>
  )
}