import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SupportCenter from "./pages/SupportCenter";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const theme = useSelector((s: RootState) => s.theme.mode);
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <div
      className={theme === "light" ? "light min-h-screen" : "dark min-h-screen"}
    >
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/support" element={<SupportCenter />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
