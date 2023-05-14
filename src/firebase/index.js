// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0oczeqbZxovpZCrQ3t8NEYo5Ai4NjTPU",
  authDomain: "kanten-5f41a.firebaseapp.com",
  projectId: "kanten-5f41a",
  storageBucket: "kanten-5f41a.appspot.com",
  messagingSenderId: "891655508038",
  appId: "1:891655508038:web:1ae766c1298bd361867a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export {
    db
}