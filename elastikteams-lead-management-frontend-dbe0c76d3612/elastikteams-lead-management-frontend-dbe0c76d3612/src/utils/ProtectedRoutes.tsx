import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoutes: React.FC = () => {
  const { user,isLoggedIn } = useAuth();

  if (!user || !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
