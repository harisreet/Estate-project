import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleAdminLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/admin/login", {
        email,
        password,
      });
      if (res.data.status === "success") {
        alert("Admin login successful!");
        localStorage.setItem("adminToken", res.data.access_token);
        //axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
        navigate("/admin/home")
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center  bg-gray-200">
      <div className="mx-auto flex flex-col text-center bg-blue-900 gap-4 text-white p-8 rounded-lg">
        <img src={assets.logo_dark} alt="Logo" className="mx-auto w-24"/>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded text-white"/>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 rounded text-white" />
        <button onClick={handleAdminLogin} className="bg-green-600 p-2 rounded hover:bg-green-700">
          Login as Admin</button>
      </div>
    </div>
  );
};

export default AdminLogin;
