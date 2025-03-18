import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LogInFormData, LogInFormErrors } from "../../types/login.types";
import { validateLoginForm } from "../../utils/validators";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

// Define types for form data and errors

const LogIn = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState<LogInFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LogInFormErrors>({
    email: "",
    password: "",
  });

  const [logInError, setLogInError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setLogInError("");
    setErrors({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLoginForm(formData, setErrors)) {
      // validate form
      setIsSubmitting(true);

      // API call
      try {
        const apiResponse = await api.loginUser(
          formData.email,
          formData.password,
          setErrors,
          login
        );

        // console.log(apiResponse)
        if (apiResponse.success) {
          setIsSubmitting(false);
          // setTimeout(() => {
          setFormData({
            email: "",
            password: "",
          });


          toast.success(apiResponse.message || "Login Successful",{duration:5000,position:"bottom-left"})

          // Navigate to /dashboard 
          navigate("/dashboard");

          // }, 3000);
        } else if (apiResponse.type == "email") {
          toast.error("Invalid Email!",{duration:5000,position:"bottom-left"})
          setErrors(
            {
              email: apiResponse.error || "Invalid Email",
              password: "",
            }
          )
        } else if (apiResponse.type == "password") {
          toast.error("Invalid Password!",{duration:5000,position:"bottom-left"})
          setErrors(
            {
              email: "",
              password: apiResponse.error || "Invalid Password",
            }
          )
        } else {
          toast.error("Failed to Login, Try Again.",{duration:5000,position:"bottom-left"})
          setLogInError(apiResponse.error || "Failed to Login, Try Again.")
        }
      } catch (error) {
        toast.error("Failed to Login, Try Again.",{duration:5000,position:"bottom-left"})
        setLogInError("Error logging User,Try Again!")
        console.error("Error logging User", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Lead Flow</h1>
          <p className="text-blue-100 mt-2 font-light">
            Smart leads, smarter decision. Login Now!
          </p>
        </div>

        <div className="p-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                    }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                    }`}
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium shadow-md ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging You In...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
              {logInError ?
                (<p className="mt-1 text-center text-sm text-red-600">
                  {logInError}
                </p>) : ("")
              }
            </div>
          </form>


          <div className="mt-8 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <strong>

                <Link
                  to="/sign-up"
                  className="font-medium text-blue-600 hover:text-blue-500 transition duration-150"
                >
                  Sign Up
                </Link>
              </strong>
              {" "}Now!
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By Creating and Logging in account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
