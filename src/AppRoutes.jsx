import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Slider from './components/Slider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import LoginPage from './pages/Loginpage';
import UserRegister from './pages/UserRegister';

export default function AppRoutes() {

  return (
      <Router>
        <Navbar />
        {!(window.location.pathname === "/user-login" && window.location.pathname === "/user-register") && <Slider />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie-details" element={<About/>} />
          <Route path="/user-login" element={<LoginPage/>} />
          <Route path="/user-register" element={<UserRegister/>} />
        </Routes>
        <Footer />
      </Router>
  )
}
