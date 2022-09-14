import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '@commons/ApiCall';

export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}) => {
    try {
      return apiClient
        .post(`signin`, {
          username,
          password,
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(
            'Log Err',
            err.response.data.diagnostic,
            err.response.status,
          );
          return err.response.data.diagnostic;
        });
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  isLoggedIn: false,
  //   user: null,
  loading: false,
  success: {
    sts: false,
    data: [],
  },
  failed: {
    sts: false,
    data: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
      state.success = {sts: false, data: []};
      state.failed = {sts: false, data: []};
    },
    [login.fulfilled]: (state, action) => {
      console.log('reduser Suks', action.payload);
      state.loading = false;

      if (action.payload.data) {
        state.success = {sts: true, data: action.payload.data};
      } else {
        // state.isLoggedIn = true;
        state.failed = {sts: true, data: action.payload};
      }
    },
    // [login.rejected]: (state, action) => {
    //   console.log('reduser Err', action.payload);
    //   state.loading = false;
    //   if (action.payload?.diagnostic.error) {
    //     state.isLoggedIn = true;
    //     state.failed = {sts: true, data: action.payload.diagnostic.message};
    //   } else {
    //     state.success = {sts: true, data: action.payload.data};
    //   }
    // },
  },
});

const {reducer} = authSlice;

export default reducer;
