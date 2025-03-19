import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpFormData, SignUpFormErrors } from "../../types/signup.types";
import { validateSignupForm } from "../../utils/validators";
import { api } from "../../services/api";
import PasswordInput from "@/components/auth/PasswordInput";
import TextInput from "@/components/auth/TextInput";
import Disclaimer from "@/components/auth/Disclaimer";
import SSOButtons from "@/components/auth/SSOButtons";

// Define types for form data and errors

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateSignupForm(formData, setErrors)) {
      setIsSubmitting(true);

      // Simulate API call

      try {
        const apiResponse = await api.registerUser(
          formData.name,
          formData.email,
          formData.password,
          setErrors
        );

        if (apiResponse) {
          setIsSubmitting(false);
          setIsSuccess(true);
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              password: "",
            });

            navigate('/login')

            setIsSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Error creating user", error);
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
            Smart leads, smarter decision. Join us today !
          </p>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully.
              </p>
              <p className="text-sm text-gray-500">
                You will be redirected to the login page shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <TextInput
                id="name"
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                placeholder="John Doe"
                error={errors.name}
                icon="user"
                onChange={handleChange}
              />
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
                label="Create Password"
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
                  className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium shadow-md ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
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
                      Processing...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-150"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-5 text-center relative border-t border-gray-200 pt-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-gray-500">
              OR
            </span>
            <SSOButtons />
          </div>

          <Disclaimer />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
