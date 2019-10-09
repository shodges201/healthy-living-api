import * as firebase from 'firebase';
require("dotenv").config();
console.log(process.env);
console.log(process.env.FIREBASE_KEY);

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "healthy-living-5cb07.firebaseapp.com",
    databaseURL: "https://healthy-living-5cb07.firebaseio.com",
    projectId: "healthy-living-5cb07",
    storageBucket: "",
    messagingSenderId: "996770199690",
    appId: process.env.FIREBASE_APPID,
    measurementId: "G-HGLF370KX0"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;