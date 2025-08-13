// src/pages/LoginPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Login/AuthProvider";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const location = useLocation();
   const [contact, setContact] = useState("");
   const [username, setUsername] = useState("");
   const { login, loading, user } = useAuth();
   
   // Store the previous location in state
   const from = location.state?.from?.pathname || "/";

   useEffect(() => {
      // Retrieve user data from cookies on component mount
      const token = Cookies.get("token");
      if (token) {
         try {
            const decoded = jwtDecode(token);
            setUsername(decoded.userData?.username || "");
         } catch (e) {
            console.error("Failed to decode token:", e);
         }
      }
   }, [user]);

   const handleLogin = async (event) => {
      event.preventDefault();
      const loginData = {
         email: contact,
         password,
      };

      try {
         await login(loginData);
         navigate('/');
      } catch (error) {
         toast.error(error);
         console.error("Login failed:", error);
      }
   };

   return (
      <div
         className="flex items-center justify-center min-h-[90vh] relative overflow-hidden"
         style={{
            background: "linear-gradient(150deg, #2563eb 0%, #60a5fa 100%)",
         }}
      >
         {/* Decorative clipped background */}
         <div
            style={{
               position: "absolute",
               top: 0,
               left: 0,
               width: "100vw",
               height: "100vh",
               zIndex: 0,
               background: "linear-gradient(120deg, #2563eb 60%, #60a5fa 100%)",
               clipPath: "polygon(0 0, 100% 0, 100% 70%, 40% 40%, 50% 80%)",
               filter: "blur(4px)",
               opacity: 0.7,
            }}
         />
         {/* Login Card */}
         <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-4 pt-16 rounded-xl shadow-2xl z-10">
            <h2 className="text-5xl font-extrabold mb-10 text-center text-blue-700 drop-shadow">
               Login
            </h2>
            <h3 className="text-center text-3xl text-blue-500">Welcome</h3>
            <h4 className="text-center text-lg text-gray-600 mt-2 mb-6">
               Log in to your account, {username ? `Welcome back, ${username}!` : "please enter your details."}
            </h4>
            <form onSubmit={handleLogin}>
               <div className="mb-4 m-2">
                  <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">
                     Email or Phone Number
                  </label>
                  <input
                     type="text"
                     id="contact"
                     className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                     placeholder="Enter your email or phone number"
                     value={contact}
                     onChange={(e) => setContact(e.target.value)}
                     required
                  />
               </div>
               <div className="mb-4 m-2">
                  <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                     placeholder="Enter your password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
               <div className="mb-4 m-2">
                  <button
                     type="submit"
                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition"
                     disabled={loading}
                  >
                     {loading ? "Logging in..." : "Continue"}
                  </button>
               </div>
            </form>
            <p className="mt-4 mb-10 text-center text-gray-700">
               Don't have an account?{" "}
               <a href="/user-register" className="text-blue-600 hover:underline font-semibold">
                  Register
               </a>
            </p>
         </div>
      </div>
   );
};

export default LoginPage;
