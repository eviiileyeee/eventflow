// router/AppRouter.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/ui/Loader';
import DashboardLayout from '../components/layout/DashboardLayout';

// Lazy Load Pages - Grouped by functionality for better code splitting
// Auth pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));

// Main pages
const Hero = lazy(() => import('../pages/Hero'));

// User pages
const ProfilePage = lazy(() => import('../pages/nav/ProfilePage'));
const NotificationPage = lazy(() => import('../pages/nav/NotificationPage'));

// Event pages
const Events = lazy(() => import('../pages/eventPages/Events'));
const EventCreationForm = lazy(() => import('../pages/eventPages/EventCreationForm'));
const EventFullViewWrapper = lazy(() => import('../components/eventComponents/EventFullViewWrapper'));

// Contact pages
const ContactPage = lazy(() => import('../pages/contactPages/ContactPage'));
const SearchUserPage = lazy(() => import('../pages/contactPages/SearchUserPage'));
const SearchedUserPage = lazy(() => import('../pages/contactPages/SearchedUserPage'));

// Other pages
const About = lazy(() => import('../components/layout/footer/footerLinks/About'));
const ServicesPage = lazy(() => import('../pages/nav/ServicesPage'));
const PageNotFound = lazy(() => import('../components/subComponents/PageNoteFound'));

// Layout wrapper component for cleaner code
const DashboardWrapper = ({ children }) => (
  <DashboardLayout>
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  </DashboardLayout>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        } />
        <Route
          path="/"
          element={
            <DashboardWrapper>
              <Hero />
            </DashboardWrapper>
          }
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <ProfilePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <NotificationPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <DashboardWrapper>
                <Events />
              </DashboardWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <DashboardWrapper>
                <EventCreationForm />
              </DashboardWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <EventFullViewWrapper />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Other routes */}
        <Route
          path="/about"
          element={
            <DashboardWrapper>
              <About />
            </DashboardWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <DashboardWrapper>
              <ContactPage />
            </DashboardWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<Loader />}>
              <SearchUserPage />
            </Suspense>
          }
        />
        <Route
          path="/search/:username"
          element={
            <Suspense fallback={<Loader />}>
              <SearchedUserPage />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <DashboardWrapper>
              <ServicesPage />
            </DashboardWrapper>
          }
        />

        {/* 404 route - temporarily disabled until component is created */}
        {/* 
        <Route 
          path="*" 
          element={
            <DashboardWrapper>
              <div className="flex items-center justify-center min-h-screen">
                <PageNotFound />
              </div>
            </DashboardWrapper>
          } 
        />
        */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
