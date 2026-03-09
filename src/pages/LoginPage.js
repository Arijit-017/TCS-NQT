import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ADMIN_EMAIL = "ajghosh017@gmail.com";

  const login = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res.user.email === ADMIN_EMAIL) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>

        <p className="text-center mt-3">
          New user?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}