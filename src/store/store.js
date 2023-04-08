import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import CityReducer from './slicers/CitySlicer'
import AuthReducer from './slicers/AuthSlicer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers(
  {
    auth : AuthReducer,
    city : CityReducer
  }
))

/*const persistedReducer = persistReducer(persistConfig, CityReducer)*/

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store);