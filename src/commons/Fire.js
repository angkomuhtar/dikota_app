// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFfIjeBMd3Q9PbPmEhAazYvVZwGoONQQM',
  authDomain: 'dikota-9c1dc.firebaseapp.com',
  projectId: 'dikota-9c1dc',
  storageBucket: 'dikota-9c1dc.appspot.com',
  messagingSenderId: '96028871588',
  appId: '1:96028871588:web:8427348a6b58f6d11f4f31',
};

// Initialize Firebase
let app;

if (!firebase.apps.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export {auth};
