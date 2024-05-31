// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIyYhmqzUP7z6SBWhCFGCKe0jtnzJd1mQ",
  authDomain: "e-shop-ms.firebaseapp.com",
  projectId: "e-shop-ms",
  storageBucket: "e-shop-ms.appspot.com",
  messagingSenderId: "282136088707",
  appId: "1:282136088707:web:8906ec714c6f46cfc38bb6",
  measurementId: "G-CZWLQELCXQ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
