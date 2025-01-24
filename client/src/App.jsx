import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/Register';
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import Cursor from "./components/Cursor";
import ContactPage from "./pages/ContactPage";
import NotificationPage from "./pages/NotificationPage";
import EventFullViewWrapper from "./components/EventFullViewWrapper";

const DashboardLayout = ({ children }) => (
  <div id="main" className="relative overflow-hidden min-h-screen">
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </div>
);


const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <DashboardLayout>
              <Hero />
            </DashboardLayout>
          } />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
          />

          <Route path="/events" element={
            <DashboardLayout>
              <Events />
            </DashboardLayout>
          } />
          <Route path="/events/:id" element={<EventFullView />} />
          <Route path="/about" element={
            <DashboardLayout>
              <About />
            </DashboardLayout>
          } />

          <Route path="/contact" element={
            <DashboardLayout>
              <ContactPage />
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
        <Cursor />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
