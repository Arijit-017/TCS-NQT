import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Header({ name }) {

  return (

    <div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3 shadow">

      <h1 className="text-lg font-bold">
        Problem Tracker
      </h1>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          {name}
        </span>

        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>

  );
}