import {configureStore} from '@reduxjs/toolkit';
import todosReducer from '@redux/slices/todosSlices';
import authReducer from '@redux/slices/authSlices';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});

export default store;
