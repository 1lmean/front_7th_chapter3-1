import React from "react";
import { Header } from "./components/shared/Header";
import { ManagementPage } from "./pages/management/ManagementPage";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
