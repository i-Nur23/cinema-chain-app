import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VisitorApp from './VisitorApp';
import {Home} from "./views/Home";
import {
  createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {FilmShedulue} from "./views/Film";
import {VisitorAuthorization} from "./views/VisitorAuthorization";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<VisitorApp/>}>
          <Route index element={<Home/>}/>
          <Route path="films/:id" element={<FilmShedulue/>}/>
          <Route path="authorization" element={<VisitorAuthorization/>} />
        </Route>
    )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
