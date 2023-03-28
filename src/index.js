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
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";


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
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
