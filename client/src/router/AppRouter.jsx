import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/ui/Loader';
import EventFullViewWrapper from '../components/eventComponents/EventFullViewWrapper';

// Lazy Load Pages
const Hero = lazy(() => import('../pages/Hero'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const ProfilePage = lazy(() => import('../pages/nav/ProfilePage'));
const NotificationPage = lazy(() => import('../pages/nav/NotificationPage'));
const Events = lazy(() => import('../pages/eventPages/Events'));
const EventCreationForm = lazy(() => import('../pages/eventPages/EventCreationForm'));
const About = lazy(() => import('../components/layout/footer/footerLinks/About'));
const ContactPage = lazy(() => import('../pages/contactPages/ContactPage'));
const SearchUserPage = lazy(() => import('../pages/contactPages/SearchUserPage'));
const SearchedUserPage = lazy(() => import('../pages/contactPages/SearchedUserPage'));
const ServicesPage = lazy(() => import('../pages/nav/ServicesPage'));
const PageNotFound = lazy(() => import('../components/subComponents/PageNoteFound'));
const DashboardLayout = lazy(() => import('../components/layout/DashboardLayout'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Suspense fallback={<Loader />}><DashboardLayout><Hero /></DashboardLayout></Suspense>} />

          {/* Protected routes */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/events" element={<ProtectedRoute><Suspense fallback={<Loader />}><DashboardLayout><Events /></DashboardLayout></Suspense></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><Suspense fallback={<Loader />}><DashboardLayout><EventCreationForm /></DashboardLayout></Suspense></ProtectedRoute>} />
          <Route path="/events/:id" element={<EventFullViewWrapper />} />

          {/* Other routes */}
          <Route path="/about" element={<Suspense fallback={<Loader />}><DashboardLayout><About /></DashboardLayout></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<Loader />}><DashboardLayout><ContactPage /></DashboardLayout></Suspense>} />
          <Route path="/search" element={<Suspense fallback={<Loader />}><DashboardLayout><SearchUserPage /></DashboardLayout></Suspense>} />
          <Route path="/search/:username" element={<SearchedUserPage />} />
          <Route path="/services" element={<Suspense fallback={<Loader />}><DashboardLayout><ServicesPage /></DashboardLayout></Suspense>} />

          {/* 404 route */}
          <Route path="*" element={<Suspense fallback={<Loader />}><DashboardLayout><div className="flex items-center justify-center min-h-screen"><PageNotFound /></div></DashboardLayout></Suspense>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
