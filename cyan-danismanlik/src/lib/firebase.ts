import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOMKXxC5wWL77PC-FMP746YhhzIqwssvU",
  authDomain: "cyan-danismanlik-c7140.firebaseapp.com",
  projectId: "cyan-danismanlik-c7140",
  storageBucket: "cyan-danismanlik-c7140.firebasestorage.app",
  messagingSenderId: "63015852697",
  appId: "1:63015852697:web:abb66394e1b378257c7608"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);