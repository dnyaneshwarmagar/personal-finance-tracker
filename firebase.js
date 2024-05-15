// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc,getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdk0Mo_ehO4QLHcSY6sTMiTUuAQmS-M-Y",
  authDomain: "personal-finance-tracker-8b214.firebaseapp.com",
  projectId: "personal-finance-tracker-8b214",
  storageBucket: "personal-finance-tracker-8b214.appspot.com",
  messagingSenderId: "136823915933",
  appId: "1:136823915933:web:3e6f2994823eea46ad1b74",
  measurementId: "G-S8Y39W5KSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db,auth,provider,doc,setDoc,getDoc}