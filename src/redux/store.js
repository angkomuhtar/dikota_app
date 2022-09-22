import {configureStore} from '@reduxjs/toolkit';
import todosReducer from '@redux/slices/todosSlices';
import authReducer from '@redux/slices/authSlices';
import userReducer from '@redux/slices/userSlices';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
