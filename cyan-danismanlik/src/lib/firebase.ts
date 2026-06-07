import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
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

// Persist reads in IndexedDB so repeat visits render from cache instantly
// (and revalidate in the background) instead of always waiting on the network.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const auth = getAuth(app);