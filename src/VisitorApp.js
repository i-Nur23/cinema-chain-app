import {Outlet} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {useEffect} from "react";

const VisitorApp = () => {
  /*useEffect(() => {
    const importTE = async () => {
      await import("tw-elements");
    };
    importTE();
  }, []);*/


  return (
    <div className='flex flex-col min-h-screen justify-between bg'>
      <div className='flex flex-col'>
        <Navbar/>
        <div className="pb-20">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default VisitorApp;
