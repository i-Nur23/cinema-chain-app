import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VisitorApp from './VisitorApp';
import {Home} from "./views/Home";
import {
  createBrowserRouter, createRoutesFromElements, Navigate, redirect, Route, Router, RouterProvider,
} from "react-router-dom";
import {FIlmInfo, FilmShedulue} from "./views/Film";
import {VisitorAuthorization} from "./views/VisitorAuthorization";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {CityOffices, OfficesFilms} from "./views/Office";
import {MainPage, StaffApp, StaffAuthorization} from "./views/Staff";
import {Test} from "./views/Test";
import {Chain} from "./views/Chain";
import {UserBookings, UserProfile, PasswordChange, UserComplaints} from "./views/User";
import {
  ActorsDirectorsList,
  AddFilm,
  AddManager,
  AddOffice, AddOperator, AllComplaints, ChangeFilmInfo,
  FilmsList,
  ManagersList,
  OfficesList, OperatorsList
} from "./views/Staff/Administrator";
import {BranchOfficeComplaints, OfficeTimetable} from "./views/Staff/Manager";
import {ComplaintsPage} from "./views/Complaints";
import {ArchiveComplaints, NewComplaints} from "./views/Staff/FeebackOperator";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<VisitorApp/>}>
          <Route index element={<Home/>}/>
          <Route path='test' element={<Test/>}/>
          <Route path='chain' element={<Chain/>}/>
          <Route path='complaints' element={<ComplaintsPage/>}/>
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
            <Route path='complaints' element={<UserComplaints/>}/>
          </Route>

        </Route>
        <Route path="staff">
          <Route index element={<StaffAuthorization/>}/>
          <Route path='main' element={<StaffApp/>}>
            <Route index element={<MainPage/>}/>
            <Route path='new_branch_office' element={<Navigate to={'-1'}/>}/>
            <Route path='new_branch_office/:id' element={<AddOffice/>}/>
            <Route path='branch_offices' element={<OfficesList/>}/>
            <Route path='new_manager' element={<Navigate to={'-1'}/>}/>
            <Route path='new_manager/:id' element={<AddManager/>}/>
            <Route path='managers' element={<ManagersList/>}/>
            <Route path='new_operator' element={<Navigate to={'-1'}/>}/>
            <Route path='new_operator/:id' element={<AddOperator/>}/>
            <Route path='operators' element={<OperatorsList/>}/>
            <Route path='new_film' element={<AddFilm/>}/>
            <Route path='films' element={<FilmsList/>}/>
            <Route path='films/:id' element={<ChangeFilmInfo/>}/>
            <Route path='crew' element={<ActorsDirectorsList/>}/>
            <Route path='timetable' element={<OfficeTimetable/>}/>
            <Route path='new_messages' element={<NewComplaints/>}/>
            <Route path='old_messages' element={<ArchiveComplaints/>}/>
            <Route path='branchOfficeComplaints' element={<BranchOfficeComplaints/>}/>
            <Route path='chainComplaints' element={<AllComplaints/>}/>
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
)
