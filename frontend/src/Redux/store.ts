import { configureStore } from '@reduxjs/toolkit';
import {combineReducers } from '@reduxjs/toolkit'
import { persistReducer ,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice'; // Adjust the path accordingly
import doctorReducer from './slices/doctorAuthSlice';
import  adminReducer from './slices/adminSlice'


const persistConfig = {
  key: 'root',
  whitelist: ['auth','doctorAuth','adminAuth'],
  storage,
};


const reducer = combineReducers({

    auth: authReducer,
    doctorAuth:doctorReducer,
    adminAuth:adminReducer

});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store=configureStore({
    reducer:{
       persisted:persistedReducer
    }
})


const persistor = persistStore(Store);
export { Store, persistor };






  

