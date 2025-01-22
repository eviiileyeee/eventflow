// src/components/Stars.jsx
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext/ThemeContext';

const Stars = () => {
  const [stars, setStars] = useState([]);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        size: Math.random() < 0.3 ? 2 : 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDuration: `${Math.random() * 3 + 2}s`,
        initialOpacity: Math.random() * 0.5 + 0.2
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  if (!darkMode) return null; // Only show stars in dark mode

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.initialOpacity,
            animationDuration: star.animationDuration,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)'
          }}
        />
      ))}
    </div>
  );
};

export default Stars;