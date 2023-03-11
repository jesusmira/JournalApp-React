// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRLOWsa6gxrkb2fRTxM9Rzy9LWXCNDqlA",
  authDomain: "react-cursos-3a27f.firebaseapp.com",
  projectId: "react-cursos-3a27f",
  storageBucket: "react-cursos-3a27f.appspot.com",
  messagingSenderId: "873652012520",
  appId: "1:873652012520:web:a52e54036dfaee3aff905d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore ( FirebaseApp );