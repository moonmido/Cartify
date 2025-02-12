// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc,getDoc, getFirestore,updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbhAcVMnHY-m1Xzaw8njrIW4r8TgX5arY",
  authDomain: "cartify-3a2ac.firebaseapp.com",
  projectId: "cartify-3a2ac",
  storageBucket: "cartify-3a2ac.firebasestorage.app",
  messagingSenderId: "509380343968",
  appId: "1:509380343968:web:4af3b6fda783d924ceb1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);



export {getAuth, createUserWithEmailAndPassword,app,auth,setDoc,doc,getDoc,db,signInWithEmailAndPassword,updateDoc}