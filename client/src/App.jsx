import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import Loader from './components/ui/Loader';
import './index.css';

const Cursor = lazy(() => import('./components/ui/Cursor'));

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <AppRouter />
          <Suspense fallback={null}>
            <Cursor />
          </Suspense>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;