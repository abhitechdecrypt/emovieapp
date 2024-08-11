import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Slider from "./components/Slider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import LoginPage from "./pages/Loginpage";
import UserRegister from "./pages/UserRegister";
import NotAuthorized from "./pages/NotAuthorized"; // Create this page
import PrivateRoute from "./PrivateRoute"; // Adjust path as needed
import AddMovies from "./pages/AddMovies";
import EditMovies from "./pages/EditMovies";
import DeleteMovies from "./pages/DeleteMovies";
import UserDashboard from "./pages/UserDashboard";
import { excludedPaths } from "./CONSTANT";
import ViewCinema from "./pages/ViewCinema";

function AppRoutes() {
   const location = useLocation();

   const showSlider = !excludedPaths.includes(location.pathname);
   return (
      <>
         <Navbar />
         {showSlider && <Slider />}
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie-details" element={<About />} />
            <Route path="/user-login" element={<LoginPage />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route
               path="/add-movies"
               element={<PrivateRoute element={AddMovies} requiredRole="ADMIN" />}
            />
            <Route
               path="/edit-movies"
               element={<PrivateRoute element={EditMovies} requiredRole="ADMIN" />}
            />
            <Route
               path="/delete-movies"
               element={<PrivateRoute element={DeleteMovies} requiredRole="ADMIN" />}
            />
            <Route
               path="/block-cinema"
               element={<PrivateRoute element={ViewCinema} requiredRole="ADMIN" />}
            />
            {/* Other routes */}
            <Route path="/not-authorized" element={<NotAuthorized />} />
         </Routes>
         <Footer />
      </>
   );
}

export default function App() {
   return (
      <Router>
         <AppRoutes />
      </Router>
   );
}
