import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { MdCalendarToday, MdPeople, MdSchedule, MdQrCodeScanner, MdChecklist } from 'react-icons/md';
import './Asignaciones.css';

export default function Asignaciones() {
  const navigate = useNavigate();
  const [selectedMateria, setSelectedMateria] = useState(null);

  // Datos de ejemplo - Estructura según tu BD
  // Cuando implementes la API, obtendrías esto de:
  // GET /api/maestros/{maestro_id}/asignaciones
  const asignaciones = [
    {
      id: 1,  // ASIGNACION_MAESTRO_MATERIA_GRUPO.id
      maestro_id: 1,
      materia_id: 1,
      materia: {
        id: 1,
        nombre: 'Matemáticas',
        codigo: 'MAT101'
      },
      grupo_id: 1,
      grupo: {
        id: 1,
        nombre: 'A-101',
        cuatrimestre: 1
      },
      // Datos calculados o agregados
      total_alumnos: 32,
      horario: 'Lun/Mié 7:00-9:00',  // Esto vendría de otra tabla o se calcula
      asistencia_promedio: 92
    },
    {
      id: 2,
      maestro_id: 1,
      materia_id: 1,
      materia: {
        id: 1,
        nombre: 'Matemáticas',
        codigo: 'MAT101'
      },
      grupo_id: 2,
      grupo: {
        id: 2,
        nombre: 'A-102',
        cuatrimestre: 1
      },
      total_alumnos: 28,
      horario: 'Mar/Jue 9:00-11:00',
      asistencia_promedio: 88
    },
    {
      id: 3,
      maestro_id: 1,
      materia_id: 2,
      materia: {
        id: 2,
        nombre: 'Física',
        codigo: 'FIS101'
      },
      grupo_id: 3,
      grupo: {
        id: 3,
        nombre: 'B-201',
        cuatrimestre: 2
      },
      total_alumnos: 30,
      horario: 'Lun/Mié 9:00-11:00',
      asistencia_promedio: 85
    },
    {
      id: 4,
      maestro_id: 1,
      materia_id: 2,
      materia: {
        id: 2,
        nombre: 'Física',
        codigo: 'FIS101'
      },
      grupo_id: 4,
      grupo: {
        id: 4,
        nombre: 'B-202',
        cuatrimestre: 2
      },
      total_alumnos: 25,
      horario: 'Jue 10:00-12:00',
      asistencia_promedio: 90
    },
    {
      id: 5,
      maestro_id: 1,
      materia_id: 3,
      materia: {
        id: 3,
        nombre: 'Química',
        codigo: 'QUI101'
      },
      grupo_id: 5,
      grupo: {
        id: 5,
        nombre: 'C-301',
        cuatrimestre: 3
      },
      total_alumnos: 27,
      horario: 'Mar/Vie 8:00-10:00',
      asistencia_promedio: 86
    }
  ];

  // Agrupar asignaciones por materia
  const materias = asignaciones.reduce((acc, asignacion) => {
    const materiaId = asignacion.materia_id;
    
    if (!acc[materiaId]) {
      acc[materiaId] = {
        id: asignacion.materia.id,
        nombre: asignacion.materia.nombre,
        codigo: asignacion.materia.codigo,
        grupos: []
      };
    }
    
    acc[materiaId].grupos.push({
      id: asignacion.grupo.id,
      nombre: asignacion.grupo.nombre,
      asignacion_id: asignacion.id,  // Importante: ID de la asignación
      alumnos: asignacion.total_alumnos,
      horario: asignacion.horario,
      asistencia: asignacion.asistencia_promedio
    });
    
    return acc;
  }, {});

  const materiasArray = Object.values(materias);

  const handleGenerarQR = (asignacion_id, materia, grupo) => {
    navigate('/maestro/qr', {
      state: {
        asignacion_id,
        materia,
        grupo
      }
    });
  };

  const handleVerLista = (asignacion_id, materia, grupo) => {
    navigate('/maestro/asistencia', {
      state: {
        asignacion_id,
        materia,
        grupo
      }
    });
  };

  return (
    <MainLayout title="Mis Asignaciones" userName="Profesor García">
      <div className="asignaciones-container">
        
        {/* Tabs de Materias */}
        <div className="materias-tabs">
          {materiasArray.map(m => (
            <button 
              key={m.id} 
              onClick={() => setSelectedMateria(m)}
              className={`materia-tab ${selectedMateria?.id === m.id ? 'active' : ''}`}
            >
              {m.nombre}
              <span className="materia-badge">
                {m.grupos.length}
              </span>
            </button>
          ))}
        </div>

        {/* Contenido Principal */}
        {selectedMateria ? (
          <div className="content-section">
            <h2 className="materia-title">{selectedMateria.nombre}</h2>
            <p className="materia-subtitle">
              {selectedMateria.grupos.length} grupo(s) asignado(s)
            </p>
            
            <div className="grupos-grid">
              {selectedMateria.grupos.map(g => (
                <div key={g.id} className="grupo-card">
                  
                  {/* Header del Card */}
                  <div className="grupo-header">
                    <h3 className="grupo-nombre">Grupo {g.nombre}</h3>
                    <span className={`asistencia-badge asistencia-${
                      g.asistencia >= 90 ? 'alta' : g.asistencia >= 80 ? 'media' : 'baja'
                    }`}>
                      {g.asistencia}%
                    </span>
                  </div>
                  
                  {/* Info del Grupo */}
                  <div className="grupo-info">
                    <div className="info-item">
                      <MdPeople className="info-icon" />
                      <span>{g.alumnos} alumnos</span>
                    </div>
                    <div className="info-item">
                      <MdSchedule className="info-icon" />
                      <span>{g.horario}</span>
                    </div>
                  </div>
                  
                  {/* Acciones */}
                  <div className="grupo-actions">
                    <button 
                      onClick={() => handleGenerarQR(
                        g.asignacion_id,
                        selectedMateria.nombre,
                        g.nombre
                      )}
                      className="action-btn action-btn-qr"
                    >
                      <MdQrCodeScanner className="btn-icon" size={18} />
                      Generar QR
                    </button>
                    <button 
                      onClick={() => handleVerLista(
                        g.asignacion_id,
                        selectedMateria.nombre,
                        g.nombre
                      )}
                      className="action-btn action-btn-lista"
                    >
                      <MdChecklist className="btn-icon" size={18} />
                      Ver Lista
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <MdCalendarToday className="empty-icon" size={64} />
            <p className="empty-text">Selecciona una materia para ver sus grupos</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
