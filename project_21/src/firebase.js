// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAe2dhmy0Qo4Dr04oAKVGgnTVZhcBJHbdA",
    authDomain: "bakeli-project-21.firebaseapp.com",
    projectId: "bakeli-project-21",
    storageBucket: "bakeli-project-21.appspot.com",
    messagingSenderId: "641829613315",
    appId: "1:641829613315:web:6c87cc531e669c5296c336"
  };
  // Initialize Firebase
  const Firebase = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = Firebase.firestore();
  


  export {db, auth }