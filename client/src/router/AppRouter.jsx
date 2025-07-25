// router/AppRouter.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const EventFullViewWrapper = lazy(() => import('../components/eventComponents/EventFullViewWrapper'));
const About = lazy(() => import('../components/layout/footer/footerLinks/About'));
const ContactPage = lazy(() => import('../pages/contactPages/ContactPage'));
const SearchUserPage = lazy(() => import('../pages/contactPages/SearchUserPage'));
const SearchedUserPage = lazy(() => import('../pages/contactPages/SearchedUserPage'));
const ServicesPage = lazy(() => import('../pages/nav/ServicesPage'));
const PageNotFound = lazy(() => import('../components/subComponents/PageNoteFound')); // Using original filename
const DashboardLayout = lazy(() => import('../components/layout/DashboardLayout'));

// Layout wrapper component for cleaner code
const DashboardWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <DashboardLayout>
      {children}
    </DashboardLayout>
  </Suspense>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notification" 
          element={
            <ProtectedRoute>
              <NotificationPage />
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
              <EventFullViewWrapper />
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
            <DashboardWrapper>
              <SearchUserPage />
            </DashboardWrapper>
          } 
        />
        <Route 
          path="/search/:username" 
          element={
            <ProtectedRoute>
              <SearchedUserPage />
            </ProtectedRoute>
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
