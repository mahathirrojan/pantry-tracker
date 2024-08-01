// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaLloNipX263HYSyjVAblV_D06s8NL6ac",
  authDomain: "inventory-management-a4ba7.firebaseapp.com",
  projectId: "inventory-management-a4ba7",
  storageBucket: "inventory-management-a4ba7.appspot.com",
  messagingSenderId: "219050423062",
  appId: "1:219050423062:web:91266b01870ce3b5481637",
  measurementId: "G-R1DVWETZ6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}