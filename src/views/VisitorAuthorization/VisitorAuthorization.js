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
      {isLogin ? <LoginForm onTypeChange={changeType}/> : <VisitorRegForm onTypeChange={changeType}/>}
    </div>
  )
}