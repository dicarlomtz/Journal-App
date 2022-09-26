import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBnKUhI8FXlJ9ZE_Rh9RsJlINdzc6bz7EM",
  authDomain: "journal-app-b7b65.firebaseapp.com",
  projectId: "journal-app-b7b65",
  storageBucket: "journal-app-b7b65.appspot.com",
  messagingSenderId: "305920845660",
  appId: "1:305920845660:web:655dc99e0122488a110399"
};

export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);