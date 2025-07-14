import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import LoginPage from '../pages/Auth/LoginPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
