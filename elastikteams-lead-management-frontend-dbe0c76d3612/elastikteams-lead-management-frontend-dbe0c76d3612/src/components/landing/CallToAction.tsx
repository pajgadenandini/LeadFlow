import React from "react";
import { Link } from "react-router-dom";

export const CallToAction: React.FC = () => {
  return (
    <div className="py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Ready to Transform Your Lead Management?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Join thousands of sales teams who have improved their conversion rates
        with our platform.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/sign-up"
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 border border-indigo-200 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all text-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
