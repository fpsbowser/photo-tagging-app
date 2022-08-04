import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaAn4-PPguuHlrfGD7bfEGHFCcuowvrmk",
  authDomain: "photo-tagging-app-odin.firebaseapp.com",
  projectId: "photo-tagging-app-odin",
  storageBucket: "photo-tagging-app-odin.appspot.com",
  messagingSenderId: "69600986779",
  appId: "1:69600986779:web:a4764f9ded2deb6609683e",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { app, database };
