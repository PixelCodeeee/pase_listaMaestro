import React from 'react';
import { Calendar, QrCode, Users, FileText, Clock, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/common/StatCard';
import './MaestroDashboard.css';

// Horario Semanal Component
const HorarioSemanal = () => {
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const horarios = [
    { dia: 'Lunes', materia: 'Matemáticas I', grupo: 'A', hora: '7:00 - 9:00' },
    { dia: 'Lunes', materia: 'Álgebra', grupo: 'B', hora: '9:00 - 11:00' },
    { dia: 'Martes', materia: 'Matemáticas I', grupo: 'C', hora: '7:00 - 9:00' },
    { dia: 'Miércoles', materia: 'Cálculo', grupo: 'A', hora: '11:00 - 13:00' },
    { dia: 'Jueves', materia: 'Álgebra', grupo: 'B', hora: '9:00 - 11:00' },
    { dia: 'Viernes', materia: 'Matemáticas I', grupo: 'A', hora: '7:00 - 9:00' },
  ];

  return (
    <div className="chart-section">
      <h3 className="section-title">
        <Calendar className="inline-block mr-2" size={20} />
        Horario Semanal
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {dias.map(dia => (
          <div key={dia}>
            <h4 style={{ textAlign: 'center', fontWeight: 600, color: '#3b82f6', marginBottom: '12px', fontSize: '14px' }}>
              {dia}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {horarios
                .filter(h => h.dia === dia)
                .map((h, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#f3f4f6',
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                  >
                    <p style={{ fontWeight: 600, color: '#1f2937', fontSize: '13px' }}>{h.materia}</p>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>Grupo {h.grupo}</p>
                    <p style={{ color: '#9ca3af', fontSize: '11px' }}>{h.hora}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mis Materias Component
const AsignacionesOverview = () => {
  const materias = [
    { nombre: 'Matemáticas I', grupos: 3, alumnos: 85, asistencia: 92 },
    { nombre: 'Álgebra', grupos: 2, alumnos: 58, asistencia: 88 },
    { nombre: 'Cálculo', grupos: 1, alumnos: 28, asistencia: 95 },
  ];

  return (
    <div className="chart-section">
      <h3 className="section-title">
        <BookOpen className="inline-block mr-2" size={20} />
        Mis Materias
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {materias.map((materia, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 600 }}>{materia.nombre}</h4>
                <p style={{ fontSize: '13px', color: '#6b7280' }}>
                  {materia.grupos} grupos · {materia.alumnos} alumnos
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#10b981' }}>
                  {materia.asistencia}%
                </p>
                <p style={{ fontSize: '11px', color: '#6b7280' }}>Asistencia</p>
              </div>
            </div>

            <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
              <div
                style={{
                  width: `${materia.asistencia}%`,
                  height: '100%',
                  backgroundColor: '#10b981',
                  borderRadius: '9999px'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Próxima Clase Component
const ProximaClase = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '16px'
          }}
        >
          <Clock size={32} color="white" />
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>Próxima Clase</h3>
          <p style={{ fontSize: '16px', color: 'white' }}>Matemáticas I - Grupo A</p>
          <p style={{ fontSize: '13px', color: 'white' }}>Hoy a las 7:00 AM</p>
        </div>

        <button
          style={{
            backgroundColor: 'white',
            color: '#1e40af',
            padding: '12px 28px',
            borderRadius: '10px',
            fontWeight: 600
          }}
        >
          Generar QR
        </button>
      </div>
    </div>
  );
};

export default function MaestroDashboard() {
  const stats = [
    {
      icon: <BookOpen size={48} />,
      title: 'Materias Asignadas',
      value: '3',
      bgColor: '#3f4955'
    },
    {
      icon: <Users size={48} />,
      title: 'Alumnos Totales',
      value: '171',
      bgColor: '#3f4955'
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Asistencia Promedio',
      value: '91.7%',
      bgColor: '#3f4955'
    }
  ];

  return (
    <MainLayout title="Dashboard" userName="Prof. García">
      <div className="admin-dashboard">

        {/* Resumen de bienvenida */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#002F6C' }}>
            Bienvenido al Panel del Maestro
          </h2>
          <p style={{ color: '#4B5563', fontSize: '15px' }}>
            Desde aquí puedes generar códigos QR, revisar listas de asistencia, gestionar justificaciones y consultar tus materias.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card-wrapper">
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Accesos Rápidos */}
        <div className="action-buttons">
          <button className="action-btn action-btn-primary">
            <QrCode size={20} className="btn-icon" />
            Generar QR
          </button>

          <button className="action-btn action-btn-primary">
            <Users size={20} className="btn-icon" />
            Ver Listas
          </button>

          <button className="action-btn action-btn-secondary" style={{ position: 'relative' }}>
            <FileText size={20} className="btn-icon" />
            Justificaciones

            {/* 🔴 Badge de pendientes */}
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '12px'
              }}
            >
              3
            </span>
          </button>
        </div>

        {/* Secciones */}
        <HorarioSemanal />
        <AsignacionesOverview />
        <ProximaClase />
      </div>
    </MainLayout>
  );
}
