import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ADMIN_EMAIL = "ajghosh017@gmail.com";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}