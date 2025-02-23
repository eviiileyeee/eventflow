import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/Register.jsx';
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import Cursor from "./components/Cursor";
import ContactPage from "./pages/contactPages/ContactPage.jsx";
import SearchUserPage from "./pages/contactPages/SearchUserPage.jsx";
import NotificationPage from "./pages/NotificationPage";
import EventFullViewWrapper from "./components/EventFullViewWrapper";
import EventFullView from "./components/EventFullView.jsx";
import ServicesPage from "./pages/ServicesPage";
import { ToastContainer } from 'react-toastify';
import PageNotFound from "./components/subComponents/PageNoteFound.jsx";
import EventCreationForm from "./pages/eventComponent/EventCreationForm.jsx";
import SearchedUserPage from "./pages/contactPages/SearchedUserPage.jsx";

const DashboardLayout = ({ children }) => (
  <div id="main" className="relative overflow-hidden min-h-screen">
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </div>
);


const App = () => {


  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>

            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
                path="/notification"
                element={
                  <NotificationPage />
                }
              />

              <Route path="/events" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Events />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/create" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <EventCreationForm />
                  </DashboardLayout>
                </ProtectedRoute>
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

              <Route path="/search" element={
                <DashboardLayout>
                  <SearchUserPage />
                </DashboardLayout>
              } />
              <Route path="/search/:username" element={<SearchedUserPage />} />

              <Route path="/services" element={
                <DashboardLayout>
                  <ServicesPage />
                </DashboardLayout>
              } />
              {/* 404 route */}
              <Route path="*" element={
                <DashboardLayout>
                  <div className="flex items-center justify-center min-h-screen">
                    <PageNotFound />
                  </div>
                </DashboardLayout>
              } />
            </Routes>
            <Cursor />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>

    </>
  );
};

export default App;
