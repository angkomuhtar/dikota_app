import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '@commons/ApiCall';
import firestore from '@react-native-firebase/firestore';

export const login = createAsyncThunk('auth/login', async user => {
  return user;
});

export const setDataUser = createAsyncThunk('auth/setData', async id => {
  // if( id == null ) return
  return firestore()
    .collection('Users')
    .doc(id)
    .get()
    .then(collect => {
      console.log('data User', collect.exists, id);
      if (collect.exists) return collect.data();
      return null;
    });
});

const initialState = {
  user: '',
  userData: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log('LOGIN', action.payload);
      state.user = action.payload;
    },
    [setDataUser.fulfilled]: (state, action) => {
      console.log('SDU PAYLOAD', action.payload);
      state.userData = action.payload;
    },
  },
});

const {reducer} = authSlice;

export default reducer;
