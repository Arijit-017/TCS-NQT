import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp3aLHfX-3nSQL9gkrhRRGWDn7DOUUenA",
  authDomain: "tcs-nqt-017.firebaseapp.com",
  projectId: "tcs-nqt-017",
  storageBucket: "tcs-nqt-017.firebasestorage.app",
  messagingSenderId: "355211845482",
  appId: "1:355211845482:web:a49b5ad7885b008c2c4f13"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);