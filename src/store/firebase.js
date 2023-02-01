import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAaaU3ffdJsaRiyyuwPOzlZXzcDb3w1KgI",

    authDomain: "tucv-aa1bf.firebaseapp.com",
  
    databaseURL: "https://tucv-aa1bf-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "tucv-aa1bf",
  
    storageBucket: "tucv-aa1bf.appspot.com",
  
    messagingSenderId: "819393943822",
  
    appId: "1:819393943822:web:e40e19f3321202a0c1df5f",
  
    measurementId: "G-PRD3EGBHYL"
  
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}