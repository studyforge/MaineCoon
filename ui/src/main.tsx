import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import RegisterPage from "./pages/RegisterPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);
