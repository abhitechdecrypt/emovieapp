import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CustomDialog from "./CustomDialog";
import { useAuth } from "../Login/AuthProvider";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [contact, setContact] = useState("");
   const [password, setPassword] = useState("");
   const [username, setUsername] = useState("");
   const { login, loading, user } = useAuth();

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

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const toggleDialog = () => {
      setDialogOpen(!dialogOpen);
   };

   const handleLogin = async (event) => {
      event.preventDefault();
      const loginData = {
         email: contact,
         password,
      };

      try {
         await login(loginData);
         setDialogOpen(false);
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   const handleLogout = () => {
      Cookies.remove("token");
      setUsername("");
      // Additional logout logic if needed
   };

   return (
      <nav className="bg-gray-800 p-3 flex items-center justify-between">
         {/* Logo and Desktop Links */}
         <div className="flex items-center space-x-4">
            <Link to="/" className="text-white text-2xl font-bold">
               E-Movie
            </Link>
         </div>

         {/* Centered Search Input */}
         <div className="flex-grow flex justify-center">
            <div className="relative max-w-xs w-full">
               <input
                  type="text"
                  placeholder="Search..."
                  className="bg-slate-400 text-slate-950 px-4 py-1 rounded-full placeholder-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
               />
               <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
               >
                  🔍
               </button>
            </div>
         </div>
         <div className="hidden md:flex items-center space-x-4">
               <Link to="/" className="text-white text-lg py-2" onClick={toggleMenu}>
                     Home
                  </Link>
                  <Link
                     to="/movie-details"
                     className="text-white text-lg py-2"
                     onClick={toggleMenu}
                  >
                     About
                  </Link>
                  <Link to="/contact" className="text-white text-lg py-2" onClick={toggleMenu}>
                     Contact
                  </Link>
                  <Link to="/movies" className="text-white text-lg py-2" onClick={toggleMenu}>
                     Movies
                  </Link>
            </div>

         {/* User Menu */}
         {username ? (
            <div className="relative group z-50">
               <button className="text-white flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-full">
                  <FaUserCircle />
                  <span>{username}</span>
               </button>
               <div className="absolute right-0 mt-0 bg-gray-800 text-white rounded-md shadow-lg w-48 hidden group-hover:block">
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                     Profile
                  </NavLink>
                  <button
                     className="block w-full px-4 py-2 text-left hover:bg-gray-700"
                     onClick={handleLogout}
                  >
                     Logout
                  </button>
               </div>
            </div>
         ) : (
            <div className="hidden md:flex items-center space-x-4">
               <Link to="/" className="text-white text-lg py-2" onClick={toggleMenu}>
                     Home
                  </Link>
                  <Link
                     to="/movie-details"
                     className="text-white text-lg py-2"
                     onClick={toggleMenu}
                  >
                     About
                  </Link>
                  <Link to="/contact" className="text-white text-lg py-2" onClick={toggleMenu}>
                     Contact
                  </Link>
                  <Link to="/movies" className="text-white text-lg py-2" onClick={toggleMenu}>
                     Movies
                  </Link>
               <Link to="/user-login" 
                  className="bg-blue-500 text-white px-4 py-2  rounded-md hover:bg-blue-600"
                  onClick={toggleDialog}
               >
                  Login
               </Link>
            </div>
         )}

         {/* Mobile Menu Toggle */}
         <button className="md:hidden text-white ml-4" onClick={toggleMenu}>
            ☰
         </button>

         {/* Mobile Menu */}
         {isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-100 z-50 md:hidden">
               <button className="absolute top-4 right-4 text-white text-2xl" onClick={toggleMenu}>
                  ✕
               </button>
               <div className="flex flex-col items-center pt-10">
                  <Link to="/" className="text-white text-2xl py-2" onClick={toggleMenu}>
                     Home
                  </Link>
                  <Link
                     to="/movie-details"
                     className="text-white text-2xl py-2"
                     onClick={toggleMenu}
                  >
                     About
                  </Link>
                  <Link to="/contact" className="text-white text-2xl py-2" onClick={toggleMenu}>
                     Contact
                  </Link>
                  <Link to="/movies" className="text-white text-2xl py-2" onClick={toggleMenu}>
                     Movies
                  </Link>
                  {username ? (
                     <>
                        <NavLink
                           to="/profile"
                           className="text-white text-2xl py-2"
                           onClick={toggleMenu}
                        >
                           Profile
                        </NavLink>
                        <button
                           className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
                           onClick={handleLogout}
                        >
                           Logout
                        </button>
                     </>
                  ) : (
                     <NavLink
                        to="/user-login"
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
                        onClick={toggleDialog}
                     >
                        Login
                     </NavLink>
                  )}
               </div>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
