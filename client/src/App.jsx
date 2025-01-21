import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import { ThemeProvider } from './components/ThemeContext/ThemeContext';



const DashboardLayout = ({ children }) => (
  <div>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </div>
);
// Create ThemeContext for light/dark mode toggling
export const ThemeContext = createContext();
const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <DashboardLayout>
              <Hero />
            </DashboardLayout>
          } />
          
          <Route path="/login" element={<LoginPage />} />

          <Route path="/profile" element={
                <ProfilePage />
          } />

          <Route path="/events" element={
            <DashboardLayout>
             <Events/>
            </DashboardLayout>
          } />

          <Route path="/about" element={
            <DashboardLayout>
             <About/>
            </DashboardLayout>
          } />

          {/* 404 route */}
          <Route path="*" element={
            <DashboardLayout>
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">Page not found</p>
                </div>
              </div>
            </DashboardLayout>
          } />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>

  );
};

export default App;