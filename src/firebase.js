import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAosPiYTy_xllCRsKUiROMWAXlAmZ-XwSU",
    authDomain: "cs378-girls-generation.firebaseapp.com",
    projectId: "cs378-girls-generation",
    storageBucket: "cs378-girls-generation.firebasestorage.app",
    messagingSenderId: "791811523680",
    appId: "1:791811523680:web:a1be9a49bf271218e56f05",
    measurementId: "G-KK82J8GD24"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };