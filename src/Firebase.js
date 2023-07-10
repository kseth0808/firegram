// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// import { Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC513tirVqwUUEhLU47xJvfc7pD2oWqks",
  authDomain: "file-upload-d6b54.firebaseapp.com",
  projectId: "file-upload-d6b54",
  storageBucket: "file-upload-d6b54.appspot.com",
  messagingSenderId: "993415725613",
  appId: "1:993415725613:web:405477ef6f8a713565eea4",
  measurementId: "G-1J9L93TMJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
