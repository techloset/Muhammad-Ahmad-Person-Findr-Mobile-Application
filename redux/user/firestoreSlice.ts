import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../store/Store';
import firestore from '@react-native-firebase/firestore';

interface UserData {
  id: string;
  Name: string;
  EyeColor: string;
}

interface FirestoreState {
  data: UserData[];
  loading: boolean;
  error: any;
}

const initialState: FirestoreState = {
  data: [],
  loading: false,
  error: null,
};

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<UserData[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchDataStart, fetchDataSuccess, fetchDataFailure} =
  firestoreSlice.actions;

export const fetchDataFromFirestore =
  (): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | 'firestore/fetchDataStart'
        | 'firestore/fetchDataSuccess'
        | 'firestore/fetchDataFailure';
    }) => void,
  ) => {
    try {
      dispatch(fetchDataStart());
      const querySnapshot = await firestore().collection('User Data').get();
      const data: UserData[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };

export default firestoreSlice.reducer;
