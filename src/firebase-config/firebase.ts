// src/firebase.ts
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ3uZxU_DhN50v_PZuV9CpXuzcmDh9Fak",
  authDomain: "todolist-2b3fe.firebaseapp.com",
  projectId: "todolist-2b3fe",
  storageBucket: "todolist-2b3fe.appspot.com",
  messagingSenderId: "80138967160",
  appId: "1:80138967160:web:234241e36b5e99df66b58d",
  measurementId: "G-GP2GE9Y7N5",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
