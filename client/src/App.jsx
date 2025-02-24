import React from "react";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import AppRouter from "./router/AppRouter";
import Cursor from "./components/ui/Cursor";
import "./index.css";

const App = () => {
  return (
    <ThemeProvider>
      <AppRouter />
      <Cursor />
    </ThemeProvider>
  );
};

export default App;
