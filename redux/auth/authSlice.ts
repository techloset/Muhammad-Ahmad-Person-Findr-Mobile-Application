import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
  user: {
    name?: string;
    email?: string;
    photo?: string;
    uid?: string;
  } | null;
  isAppLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isAppLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (
      state,
      action: PayloadAction<{
        user: {name?: string; email?: string; photo?: string; uid?: string};
      }>,
    ) => {
      state.isAuth = true;
      state.user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
        photo: action.payload.user.photo,
        uid: action.payload.user.uid,
      };
    },
    setLoggedOut: state => {
      state.isAuth = false;
      state.user = null;
      state.isAppLoading = false;
    },
  },
});

export const {setLoggedIn, setLoggedOut} = authSlice.actions;
export const authReducer = authSlice.reducer;
