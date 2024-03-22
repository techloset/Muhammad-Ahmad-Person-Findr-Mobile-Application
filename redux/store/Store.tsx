// import {configureStore} from '@reduxjs/toolkit';
// import {authReducer} from '../auth/authSlice';
// import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// import uploadUserSlice from '../user/uploadUserSlice';
// export const store = configureStore({
//   reducer: {
//     authReducer,
//     uploadUserSlice,
//   },
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// import {configureStore} from '@reduxjs/toolkit';
// import {authReducer} from '../auth/authSlice';
// import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../auth/authSlice';
import firestoreReducer from '../../redux/user/firestoreSlice'; // Adjust the import path as needed
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firestore: firestoreReducer, // Include the firestoreReducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
