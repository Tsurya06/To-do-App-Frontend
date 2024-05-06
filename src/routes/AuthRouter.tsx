import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';

export default function AuthRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
