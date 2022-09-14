import axios from 'axios';
// import {API_URL} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http://mjm.triputra.my.id/api-v1/',
  // responseType: 'json',
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

// apiClient.interceptors.request.use(async function (config, data) {
//   const token = await AsyncStorage.getItem('accestoken');
//   if (token) {
//     config.headers['Authorization'] = 'Bearer ' + token;
//   }
//   return config;
// });

export default apiClient;
