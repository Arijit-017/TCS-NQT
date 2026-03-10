import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createUserProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const ADMIN_EMAIL = "ajghosh017@gmail.com";

  const signup = async () => {

    if(!name || !email || !password){
      alert("Please fill all fields");
      return;
    }

    try{

      setLoading(true);

      const res = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // save name to Firebase Auth
      await updateProfile(res.user,{
        displayName: name.trim()
      });

      // save user profile in Firestore
      await createUserProfile(
        res.user.uid,
        email.trim(),
        name.trim()
      );

      // redirect based on role
      if(email.trim() === ADMIN_EMAIL){
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    }catch(error){

      alert(error.message);

    }finally{
      setLoading(false);
    }

  };

  return(

  <div className="flex items-center justify-center h-screen bg-gray-100">

    <div className="bg-white p-8 shadow rounded w-96">

      <h2 className="text-2xl font-bold mb-4 text-center">
        Signup
      </h2>

      <input
        placeholder="Full Name"
        className="border p-2 w-full mb-3"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={signup}
        disabled={loading}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Signup"}
      </button>

    </div>

  </div>

  );
}