
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDJUIhJ0OIK0-KHNBFsTGFlth-mvIKviHQ",
    authDomain: "keepadmin.firebaseapp.com",
    projectId: "keepadmin",
    storageBucket: "keepadmin.appspot.com",
    messagingSenderId: "1046515623488",
    appId: "1:1046515623488:web:1ba2f626145405fcc621a5",
    measurementId: "G-79Z663VBGG"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const fcm = getMessaging(app);
export { db, database, fcm};