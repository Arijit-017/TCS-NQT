import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createUserProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const ADMIN_EMAIL = "ajghosh017@gmail.com";

  const signup = async () => {

    const res = await createUserWithEmailAndPassword(auth,email,password);

    // Save name in Firebase Auth profile
    await updateProfile(res.user,{
      displayName: name
    });

    // Save user in Firestore
    await createUserProfile(res.user.uid,email,name);

    if(email === ADMIN_EMAIL){
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
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
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={signup}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Signup
      </button>

    </div>

  </div>
  )
}