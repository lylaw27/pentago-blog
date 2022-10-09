// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjeMaqW1pIrXjezILARVLqPTGPcGgVx5w",
  authDomain: "researcherp-b4467.firebaseapp.com",
  projectId: "researcherp-b4467",
  storageBucket: "researcherp-b4467.appspot.com",
  messagingSenderId: "1002013041708",
  appId: "1:1002013041708:web:e6e95782d013d46a185d89",
  measurementId: "G-Y828TWV7SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;