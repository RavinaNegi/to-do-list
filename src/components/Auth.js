// Auth.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/store";
import { logout } from "../redux/store";

const Auth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="p-4 text-center">
      {isAuthenticated ? (
        <button onClick={() => dispatch(logout())} className="bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      ) : (
        <button onClick={() => dispatch(login())} className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      )}
    </div>
  );
};

export default Auth;

