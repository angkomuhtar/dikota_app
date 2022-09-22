import firestore from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: 0,
  userDetails: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
    },
    setUserDetail: (state, action) => {
      firestore()
        .collection('Users')
        .doc(action.payload)
        .get()
        .then(collect => {
          console.log('data User Redux', collect.data());
          state.userDetails = collect.data();
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const {setData} = userSlice.actions;

export default userSlice.reducer;
