// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVLW_BCgJ4q5cqoiK6CjLLQui2-_53bRA",
  authDomain: "chat-app-a78de.firebaseapp.com",
  projectId: "chat-app-a78de",
  storageBucket: "chat-app-a78de.appspot.com",
  messagingSenderId: "660603534945",
  appId: "1:660603534945:web:33fb6399072e41867e7420",
  measurementId: "G-GXK47LPJ0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)