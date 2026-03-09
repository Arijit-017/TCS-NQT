import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs
} from "firebase/firestore";

// Create user profile after signup
export const createUserProfile = async (uid, email, name) => {

  await setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
    solvedProblems: []
  });

};


// Get logged-in user data
export const getUserData = async (uid) => {

  const snap = await getDoc(doc(db, "users", uid));

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};


// Update solved problems list
export const updateSolvedProblems = async (uid, list) => {

  await updateDoc(doc(db, "users", uid), {
    solvedProblems: list
  });

};


// Get all users (for admin dashboard)
export const getAllUsers = async () => {

  const snap = await getDocs(collection(db, "users"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

};