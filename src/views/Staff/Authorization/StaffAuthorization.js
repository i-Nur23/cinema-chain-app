import {LoginForm} from "../../../components/Forms/LoginForm";
import '../style.css'

export const StaffAuthorization = () => {
  return(
    <div className='main-container flex flex-col min-h-screen'>
      <div className='m-auto w-4/12'>
        <LoginForm/>
      </div>
    </div>
  )
}