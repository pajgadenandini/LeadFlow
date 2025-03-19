import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadDetailsPage } from "./pages/LeadDetailsPage";
import SignUp from "./pages/auth/SignUp";
import Navbar from "./components/ui/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/ui/Footer";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LogIn from "./pages/auth/LogIn";
import { LandingPage } from "./pages/landing";
import NewLeadForm from "./pages/NewLeadForm";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PreventedRoutes from "./utils/PreventedRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const { isLoggedIn } = useAuth(); // Get the authentication status
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('Google Client ID is not defined in environment variables');
    return null;
  }

  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <BrowserRouter>
        <Toaster position="bottom-left" />
        <div className="min-h-screen bg-gray-50">
          <main>
            <Routes>
              {/* Landing Page as the default route */}
              <Route path="/" element={<LandingPage />} />

              <Route element={<ProtectedRoutes />}>
                {/* Protected routes (only accessible when logged in) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leads/:leadId" element={<LeadDetailsPage />} />
                <Route path="/new-lead" element={<NewLeadForm />} />
              </Route>

              {/* Auth routes */}
              <Route element={<PreventedRoutes />}>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>

    </GoogleOAuthProvider>
  );
}

export default App;
