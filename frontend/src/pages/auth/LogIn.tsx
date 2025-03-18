import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogInFormData, LogInFormErrors } from "../../types/login.types";
import { validateLoginForm } from "../../utils/validators";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import TextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import Disclaimer from "@/components/auth/Disclaimer";
import SSOButtons from "@/components/auth/SSOButtons";

// Define types for form data and errors
declare global {
  interface Window {
    google: any;
  }
}

const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LogInFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LogInFormErrors>({
    email: "",
    password: "",
  });

  const [logInError, setLogInError] = useState("");

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


          toast.success(apiResponse.message || "Login Successful", { duration: 5000, position: "bottom-left" })

          // Navigate to /dashboard 
          navigate("/dashboard");

          // }, 3000);
        } else if (apiResponse.type == "email") {
          toast.error("Invalid Email!", { duration: 5000, position: "bottom-left" })
          setErrors(
            {
              email: apiResponse.error || "Invalid Email",
              password: "",
            }
          )
        } else if (apiResponse.type == "password") {
          toast.error("Invalid Password!", { duration: 5000, position: "bottom-left" })
          setErrors(
            {
              email: "",
              password: apiResponse.error || "Invalid Password",
            }
          )
        } else {
          toast.error("Failed to Login, Try Again.", { duration: 5000, position: "bottom-left" })
          setLogInError(apiResponse.error || "Failed to Login, Try Again.")
        }
      } catch (error) {
        toast.error("Failed to Login, Try Again.", { duration: 5000, position: "bottom-left" })
        setLogInError("Error logging User,Try Again!")
        console.error("Error logging User", error);
      } finally {
        setIsSubmitting(false);
      }
    }
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

          <form onSubmit={handleSubmit} className="space-y-3">
            <TextInput
              id="email"
              label="Email ID"
              name="email"
              type="email"
              value={formData.email}
              placeholder="your@email.com"
              error={errors.email}
              icon="mail"
              onChange={handleChange}
            />
            <PasswordInput
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              placeholder="Password"
              error={errors.password}
              onChange={handleChange}
            />
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

          <div className="mt-3 text-center">
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


          <div className="mt-5 text-center relative border-t border-gray-200 pt-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-gray-500">
              OR
            </span>
            <SSOButtons/>
          </div>

          <Disclaimer />

        </div>
      </div>
    </div>
  );
};

export default LogIn;
