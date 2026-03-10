import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  serverTimestamp
} from "firebase/firestore";


// Create user profile after signup
export const createUserProfile = async (uid, email, name) => {

  const userRef = doc(db, "users", uid);

  await setDoc(userRef, {
    name: name,
    email: email,
    solvedProblems: [],
    createdAt: serverTimestamp()
  });

};


// Get logged-in user data
export const getUserData = async (uid) => {

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {

    const data = snap.data();

    // Ensure solvedProblems always exists
    return {
      ...data,
      solvedProblems: data.solvedProblems || []
    };

  }

  return null;

};


// Update solved problems list
export const updateSolvedProblems = async (uid, list) => {

  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    solvedProblems: list
  });

};


// Get all users (for admin dashboard)
export const getAllUsers = async () => {

  const snapshot = await getDocs(collection(db, "users"));

  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    solvedProblems: doc.data().solvedProblems || []
  }));

  return users;

};