import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/ui/Loader';

// Lazy Load Pages
const Hero = lazy(() => import('../pages/Hero'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const ProfilePage = lazy(() => import('../pages/nav/ProfilePage'));
const NotificationPage = lazy(() => import('../pages/nav/NotificationPage'));
const Events = lazy(() => import('../pages/eventPages/Events'));
const EventCreationForm = lazy(() => import('../pages/eventPages/EventCreationForm'));
const EventFullView = lazy(() => import('../components/eventComponents/EventFullView'));
const About = lazy(() => import('../components/layout/footer/footerLinks/About'));
const ContactPage = lazy(() => import('../pages/contactPages/ContactPage'));
const SearchUserPage = lazy(() => import('../pages/contactPages/SearchUserPage'));
const SearchedUserPage = lazy(() => import('../pages/contactPages/SearchedUserPage'));
const ServicesPage = lazy(() => import('../pages/nav/ServicesPage'));
const PageNotFound = lazy(() => import('../components/subComponents/PageNoteFound'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
