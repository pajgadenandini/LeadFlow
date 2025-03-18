import React from "react";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-12 gap-8">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Transform Your{" "}
          <span className="text-indigo-600">Lead Management</span> Process
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Streamline your sales pipeline, nurture prospects, and close more
          deals with our powerful lead management platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/sign-up"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-indigo-200 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all"
          >
            Login
          </Link>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <span className="flex items-center">
            <svg
              className="h-5 w-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">Manage Leads</span>
          </span>
          <span>•</span>
          <span className="flex items-center">
            <svg
              className="h-5 w-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">AI Chatbot</span>
          </span>
        </div>
      </div>
      <div className="lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="Lead Management Dashboard"
          className="rounded-lg shadow-2xl w-full object-cover"
        />
      </div>
    </div>
  );
};
