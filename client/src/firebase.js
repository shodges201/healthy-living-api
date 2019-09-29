import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBYlIdeeUuVrdvop0ZhDnatkfZWscvoPnE",
    authDomain: "healthy-living-5cb07.firebaseapp.com",
    databaseURL: "https://healthy-living-5cb07.firebaseio.com",
    projectId: "healthy-living-5cb07",
    storageBucket: "",
    messagingSenderId: "996770199690",
    appId: "1:996770199690:web:1af66a8b7fef7ee6b95573",
    measurementId: "G-HGLF370KX0"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;