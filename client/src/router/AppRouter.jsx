import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Hero from "../pages/Hero";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/Register";
import ProfilePage from "../pages/nav/ProfilePage";
import NotificationPage from "../pages/nav/NotificationPage";
import Events from "../pages/eventPages/Events";
import EventCreationForm from "../pages/eventPages/EventCreationForm";
import EventFullView from "../components/eventComponents/EventFullView";
import About from "../components/layout/footer/footerLinks/About";
import ContactPage from "../pages/contactPages/ContactPage";
import SearchUserPage from "../pages/contactPages/SearchUserPage";
import SearchedUserPage from "../pages/contactPages/SearchedUserPage";
import ServicesPage from "../pages/nav/ServicesPage";
import PageNotFound from "../components/subComponents/PageNoteFound";

const AppRouter = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<DashboardLayout><Hero /></DashboardLayout>} />

          {/* Protected routes */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/events" element={<ProtectedRoute><DashboardLayout><Events /></DashboardLayout></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><DashboardLayout><EventCreationForm /></DashboardLayout></ProtectedRoute>} />
          <Route path="/events/:id" element={<EventFullView />} />

          {/* Other routes */}
          <Route path="/about" element={<DashboardLayout><About /></DashboardLayout>} />
          <Route path="/contact" element={<DashboardLayout><ContactPage /></DashboardLayout>} />
          <Route path="/search" element={<DashboardLayout><SearchUserPage /></DashboardLayout>} />
          <Route path="/search/:username" element={<SearchedUserPage />} />
          <Route path="/services" element={<DashboardLayout><ServicesPage /></DashboardLayout>} />

          {/* 404 route */}
          <Route path="*" element={<DashboardLayout><div className="flex items-center justify-center min-h-screen"><PageNotFound /></div></DashboardLayout>} />
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
