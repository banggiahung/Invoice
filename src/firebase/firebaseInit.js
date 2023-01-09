import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDGWYFsn7XMZVeEgX3gVOt15Bc9w-rmKZ0",
    authDomain: "invoice-28a1d.firebaseapp.com",
    projectId: "invoice-28a1d",
    storageBucket: "invoice-28a1d.appspot.com",
    messagingSenderId: "192486177255",
    appId: "1:192486177255:web:b2b0e7a7664793f8926542",
    measurementId: "G-SS9K2CBXNK"
};

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db