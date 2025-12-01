// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../pages/Auth/Login';

// Maestro
import MaestroDashboard from '../pages/Dashboard/MaestroDashboard';
import MaestroAsignaciones from '../pages/Maestro/Asignaciones/Asignaciones';
import MaestroGenerarQR from '../pages/Maestro/QR/GenerarQR';
import MaestroAsistencia from '../pages/Maestro/Asistencia/ListaAsistencia';
import MaestroJustificaciones from '../pages/Maestro/Justificaciones/Justificaciones';
import MaestroReportes from '../pages/Maestro/Reportes/Reportes';
import MaestroPerfil from '../pages/Maestro/Perfil/Perfil';

export default function AppRoutes() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* MAESTRO */}
      <Route path="/maestro/dashboard" element={<MaestroDashboard />} />
      <Route path="/maestro/asignaciones" element={<MaestroAsignaciones />} />
      <Route path="/maestro/qr" element={<MaestroGenerarQR />} />
      <Route path="/maestro/asistencia" element={<MaestroAsistencia />} />
      <Route path="/maestro/justificaciones" element={<MaestroJustificaciones />} />
      <Route path="/maestro/reportes" element={<MaestroReportes />} />
      <Route path="/maestro/perfil" element={<MaestroPerfil />} />

      {/* DEFAULTS */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/maestro" element={<Navigate to="/maestro/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
