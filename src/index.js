import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VisitorApp from './VisitorApp';
import {Home} from "./views/Home";
import {
  createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {FIlmInfo, FilmShedulue} from "./views/Film";
import {VisitorAuthorization} from "./views/VisitorAuthorization";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {CityOffices, OfficesFilms} from "./views/Office";
import {MainPage, StaffApp, StaffAuthorization} from "./views/Staff";
/*import 'flowbite/dist/flowbite.css'*/
import {Test} from "./views/Test";
import {Chain} from "./views/Chain";
import {UserBookings, UserProfile, PasswordChange} from "./views/User";
import {AddFilm, AddManager, AddOffice} from "./views/Staff/Administrator";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<VisitorApp/>}>
          <Route index element={<Home/>}/>
          <Route path='test' element={<Test/>}/>
          <Route path='chain' element={<Chain/>}/>
          <Route path="films">
            <Route path=":id" element={<FilmShedulue/>}/>
            <Route path=":id/info" element={<FIlmInfo/>}/>
          </Route>
          <Route path="authorization" element={<VisitorAuthorization/>} />
          <Route path="cityoffices">
            <Route path="" element={<CityOffices/>}/>
            <Route path=":id" element={<OfficesFilms/>}/>
          </Route>
          <Route path="user">
            <Route path='bookings' element={<UserBookings/>}/>
            <Route path='profile'>
              <Route index element={<UserProfile/>}/>
              <Route path='password' element={<PasswordChange/>}/>
            </Route>
          </Route>
        </Route>
        <Route path="staff">
          <Route index element={<StaffAuthorization/>}/>
          <Route path='main' element={<StaffApp/>}>
            <Route index element={<MainPage/>}/>
            <Route path='new_branch_office' element={<AddOffice/>}/>
            <Route path='new_manager' element={<AddManager/>}/>
            <Route path='new_film' element={<AddFilm/>}/>
          </Route>
        </Route>
      </Route>
    )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
      </RouterProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
