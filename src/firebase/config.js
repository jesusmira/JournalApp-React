// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// console.log(process.env);
// console.log(import.meta.env);

// Your web app's Firebase configuration
// Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyDRLOWsa6gxrkb2fRTxM9Rzy9LWXCNDqlA",
//   authDomain: "react-cursos-3a27f.firebaseapp.com",
//   projectId: "react-cursos-3a27f",
//   storageBucket: "react-cursos-3a27f.appspot.com",
//   messagingSenderId: "873652012520",
//   appId: "1:873652012520:web:a52e54036dfaee3aff905d"
// };

// Testing
// const firebaseConfig = {

//   apiKey: "AIzaSyC61yp_gVVtirbECXfRsmouR9EsIshLxng",
//   authDomain: "appimagenes-5062e.firebaseapp.com",
//   databaseURL: "https://appimagenes-5062e.firebaseio.com",
//   projectId: "appimagenes-5062e",
//   storageBucket: "appimagenes-5062e.appspot.com",
//   messagingSenderId: "575233859668",
//   appId: "1:575233859668:web:00c750a5a03bf08be18dc1"

// };
const firebaseConfig = {

    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    databaseURL: VITE_DATABASEURL,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,

};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore ( FirebaseApp );