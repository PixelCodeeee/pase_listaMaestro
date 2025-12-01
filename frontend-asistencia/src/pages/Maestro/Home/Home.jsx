import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { MdQrCodeScanner, MdChecklist, MdDescription, MdPeople, MdSchedule } from 'react-icons/md';

export default function Home() {
  const navigate = useNavigate();

  const stats = {
    materiasActivas: 3,
    gruposAsignados: 6,
    justificacionesPendientes: 5,
    asistenciaPromedio: 87
  };

  const horarioSemanal = [
    { dia: 'Lunes', horas: '7:00-9:00', materia: 'Matemáticas', grupo: 'A-101' },
    { dia: 'Lunes', horas: '9:00-11:00', materia: 'Física', grupo: 'B-202' },
    { dia: 'Martes', horas: '8:00-10:00', materia: 'Química', grupo: 'C-303' },
    { dia: 'Miércoles', horas: '7:00-9:00', materia: 'Matemáticas', grupo: 'A-101' },
    { dia: 'Jueves', horas: '10:00-12:00', materia: 'Física', grupo: 'B-202' },
    { dia: 'Viernes', horas: '8:00-10:00', materia: 'Química', grupo: 'C-303' }
  ];

  const accionesRapidas = [
    { title: 'Generar QR', icon: <MdQrCodeScanner size={32} />, path: '/maestro/qr', color: '#3b82f6' },
    { title: 'Ver Listas', icon: <MdChecklist size={32} />, path: '/maestro/asistencia', color: '#10b981' },
    { title: 'Justificaciones', icon: <MdDescription size={32} />, path: '/maestro/justificaciones', color: '#f59e0b', badge: 5 }
  ];

  return (
    <MainLayout title="Dashboard del Maestro" userName="Profesor García">
      <div style={{ padding: '20px' }}>
        {/* Estadísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'Materias Activas', value: stats.materiasActivas },
            { label: 'Grupos Asignados', value: stats.gruposAsignados },
            { label: 'Justificaciones', value: stats.justificacionesPendientes, sub: 'Pendientes' },
            { label: 'Asistencia Promedio', value: `${stats.asistenciaPromedio}%` }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#2d3748', padding: '24px', borderRadius: '12px', border: '1px solid #4a5568' }}>
              <h3 style={{ fontSize: '14px', color: '#cbd5e0', margin: '0 0 12px 0', textTransform: 'uppercase' }}>{stat.label}</h3>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#fbbf24', margin: '0' }}>{stat.value}</p>
              {stat.sub && <span style={{ fontSize: '12px', color: '#a0aec0' }}>{stat.sub}</span>}
            </div>
          ))}
        </div>

        {/* Acciones Rápidas */}
        <h2 style={{ color: '#fff', borderLeft: '4px solid #fbbf24', paddingLeft: '12px', marginBottom: '20px' }}>Acceso Rápido</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {accionesRapidas.map((accion, i) => (
            <div key={i} onClick={() => navigate(accion.path)} style={{ 
              background: '#2d3748', padding: '24px', borderRadius: '12px', border: '1px solid #4a5568', 
              borderLeft: `4px solid ${accion.color}`, cursor: 'pointer', position: 'relative' 
            }}>
              {accion.badge && <span style={{ 
                position: 'absolute', top: '16px', right: '16px', background: '#ef4444', 
                color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px' 
              }}>{accion.badge}</span>}
              <div style={{ color: accion.color, marginBottom: '12px' }}>{accion.icon}</div>
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '0' }}>{accion.title}</h3>
            </div>
          ))}
        </div>

        {/* Horario */}
        <h2 style={{ color: '#fff', borderLeft: '4px solid #fbbf24', paddingLeft: '12px', marginBottom: '20px' }}>Mi Horario Semanal</h2>
        <div style={{ background: '#2d3748', padding: '24px', borderRadius: '12px', border: '1px solid #4a5568', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#1a202c' }}>
              <tr>
                {['Día', 'Horario', 'Materia', 'Grupo'].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'left', color: '#fbbf24', fontSize: '14px', fontWeight: '600', borderBottom: '2px solid #4a5568' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarioSemanal.map((clase, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #4a5568' }}>
                  <td style={{ padding: '12px 16px', color: '#fff', fontWeight: '600' }}>{clase.dia}</td>
                  <td style={{ padding: '12px 16px', color: '#fbbf24' }}>{clase.horas}</td>
                  <td style={{ padding: '12px 16px', color: '#e2e8f0' }}>{clase.materia}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: '#1e40af', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
                      {clase.grupo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}