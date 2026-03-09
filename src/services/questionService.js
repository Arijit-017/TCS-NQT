import { db } from "../firebase/firebase";
import { collection,addDoc,onSnapshot } from "firebase/firestore";

export const addQuestion = async(title,link,day)=>{

 await addDoc(collection(db,"questions"),{
   title,
   link,
   day:Number(day)
 });

};

export const listenQuestionsRealtime = (callback)=>{

 return onSnapshot(collection(db,"questions"),(snapshot)=>{

   const data = snapshot.docs.map(doc=>({
     id:doc.id,
     ...doc.data()
   }));

   callback(data);

 });

};