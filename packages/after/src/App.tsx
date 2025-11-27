import React from "react";
import { Header } from "./components/shared/Header";
import { ManagementPage } from "./pages/management/ManagementPage";
import { ThemeProvider } from "./context/ThemeContext";

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-muted">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
