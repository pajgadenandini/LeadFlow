import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PreventedRoutes: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PreventedRoutes;
