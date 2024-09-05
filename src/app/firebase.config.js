// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHEXlAFbrboZAzEZ9t2Bwgg6IKA-t0OS8",
  authDomain: "pets-store-d72d9.firebaseapp.com",
  projectId: "pets-store-d72d9",
  storageBucket: "pets-store-d72d9.appspot.com",
  messagingSenderId: "868212737896",
  appId: "1:868212737896:web:7cc3587b14502fb629f8dd",
  measurementId: "G-XHFXVVQXR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
