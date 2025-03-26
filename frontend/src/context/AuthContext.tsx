import { User } from "@/types/common.types";
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";

// Define types for Auth State

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getAuthHeaders = (): HeadersInit => {
  // basic header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");

  // add token for JWT Auth 
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Add validate token API call
const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      // toast.loading("Authenticating...")
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }
      // decode token and check if it is not expired and valid
      const decodedToken = jwtDecode(token);
      const expTime = decodedToken.exp ?? 0;
      const curTime = Math.floor(Date.now() / 1000);

      if (expTime <= curTime) {
        // Token is expired, clean up
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
      }

      return true;
    } catch (error) {
      // Token is invalid/manipulated, clean up
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  })


  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      // Create the loading toast first
      const loadingToast = toast.loading('Validating session...', {
        position: 'bottom-left'
      });

      try {
        const validatePromise = validateToken(token);

        const isValid = await validatePromise;

        if (isValid) {
          // Check token expiration
          const decodedToken = jwtDecode(token);
          const expTime = decodedToken.exp ?? 0;
          const curTime = Math.floor(Date.now() / 1000);

          if (expTime <= curTime) {
            throw new Error('Token expired');
          }

          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
            // Update the loading toast to success
            toast.success('Session validated', {
              id: loadingToast,
              duration: 3000,
              position: 'bottom-left'
            });
          }
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        // Clean up on any error
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Update the loading toast to error
        toast.error('Session expired', {
          id: loadingToast,
          duration: 3000,
          position: 'bottom-left'
        });
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    validateAuth();
  }, []);

  const login = (newToken: string, newUser: any) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Logged out Successfully", { duration: 5000, position: "bottom-left" });
  }

  const handleGitHubOAuthCallback = async (code: string) => {
    try {
      const authResponse = await authService.handleGitHubOAuthSignIn(code);

      if (authResponse.success && authResponse.token) {
        login(authResponse.token, authResponse.user);
        toast.success('Successfully logged in!');
      } else {
        toast.error('Failed to authenticate');
      }
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      toast.error('GitHub login failed');
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      handleGitHubOAuthCallback
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
