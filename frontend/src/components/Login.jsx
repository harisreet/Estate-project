import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {api} from "../api"
const Login = ({ setShowLogin,setHideLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginPage, setShowLoginPage] = useState(true);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await api.post("/auth/google", {
        token: token,
      });

      alert("Login success ");
      localStorage.removeItem("adminToken");
      localStorage.setItem("userToken", res.data.access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
      setShowLogin(false);
      setHideLogin(true);
    } catch (err) {
      alert("Google login failed");
    }
  };

  const handleNormalLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      if (res.data.status === "success") {
        alert("Login success!");
        localStorage.removeItem("adminToken");
        localStorage.setItem("userToken", res.data.access_token);
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
        setShowLogin(false);
        setHideLogin(true);
      }  
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 404) {
        alert("User not found! Signup Required ");
        setShowLoginPage(false); 
      } else {
        alert("Incorrect email or password");
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/signup", {
        email,
        password,
      });

      if (res.data.status === "success") {
        alert("Signup success! Please login now.");
        setShowLoginPage(true); 
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-brightness-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-80 relative text-center">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={() => setShowLogin(false)} >✖</button>

        <h6 className="font-semibold text-green-600 mb-1">
          {showLoginPage ? "Sign in to Estate" : "Sign Up for Estate"}
        </h6>
        <p className="text-gray-600 text-xs mb-3">
          {showLoginPage
            ? "Welcome back! Please sign in to continue"
            : "Create your account to continue"}
        </p>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Error")}/>

        <p className="mb-5 mt-3 text-sm text-gray-500 text-center">or</p>

        <label>Email Address</label>
        <input
          type="email"
          className="outline-none w-full border-b mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input
          type="password"
          className="outline-none w-full border-b mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {showLoginPage ? (<>
            <button
              onClick={handleNormalLogin}
              className="w-full bg-green-600 text-white p-2 rounded-lg mt-3" >Login </button>
            <p className="text-center text-sm mt-3">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 ml-1 cursor-pointer"
                onClick={() => setShowLoginPage(false)}> Sign Up </button>
            </p>
          </>
        ) : (<>
            <button
              onClick={handleSignUp}
              className="w-full bg-green-600 text-white p-2 rounded-lg mt-3">Sign Up</button>
            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <button
                className="text-blue-600 ml-1 cursor-pointer"
                onClick={() => setShowLoginPage(true)}>Login</button>
            </p> </> )}
      </div>
    </div>
  );
};

export default Login;
