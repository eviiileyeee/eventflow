import React, { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import Cursor from './components/ui/Cursor';
import Loader from './components/ui/Loader';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <AppRouter />
          <Cursor />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
