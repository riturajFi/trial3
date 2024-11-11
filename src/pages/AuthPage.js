import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ address, userData, handleLogin, handleLogout }) => {
  const navigate = useNavigate(); // React Router's navigation hook

  // Redirect to chat page if already logged in
  // useEffect(() => {
  //   // if (address) {
  //   //   navigate("/chat"); // Navigate to Chat page
  //   // }
  // }, [address, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm text-center">
          <h3 className="text-lg font-semibold text-green-600">Welcome to Web3Auth</h3>
          <p className="text-gray-700 my-4">
            Login with your favorite social account to access crypto features.
          </p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
          >
            Login with Social
          </button>
        </div>
    
    </div>
  );
};

export default AuthPage;
