import {Outlet} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {useEffect} from "react";

const VisitorApp = () => {

  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <div className='flex flex-col'>
        <Navbar/>
        <div className="container mx-auto px-20 pb-20">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default VisitorApp;
