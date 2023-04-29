import './style.css'
import  React, {useState, useEffect} from "react";
import {Drawer} from "@mui/material";
import {StarIcon} from "@heroicons/react/24/solid";
import {AdminMenuItems, ManagerMenuItems, TechSpecialistMenuItems} from "./MenuLists";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const StaffApp = () => {

  const ANCHOR = 'left';
  const role = useSelector(state => state.auth.role);
  const navigate = useNavigate();
  const [open ,setOpen] = useState(false);

  useEffect(() => {
    if (role === "User" || role === "") {
      navigate("/staff")
    }
  },[])

  const toggleDrawer = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(false);
  }

  return(

    <div className='flex flex-col min-h-screen main-container'>

      <div className='my-10 mx-28 p-5 bg-white rounded-2xl border'>
        <Outlet/>
      </div>

      <div className="fixed float-left top-0">
        <div className='h-screen flex flex-col justify-center'>
          <button className="rounded-r-lg border h-14 bg-white" type="button" onClick={() => setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>
        </div>
      </div>

      <React.Fragment>
        <Drawer
          anchor={ANCHOR}
          open={open}
          onClose={e => toggleDrawer(e)}
        >
          {
            role === "Administrator"  ? <AdminMenuItems setClose={() => setOpen(false)}/> :
              role === "Manager" ? <ManagerMenuItems setClose={() => setOpen(false)}/> :
              <TechSpecialistMenuItems setClose={() => setOpen(false)}/>
          }

        </Drawer>
      </React.Fragment>
    </div>
  )
}