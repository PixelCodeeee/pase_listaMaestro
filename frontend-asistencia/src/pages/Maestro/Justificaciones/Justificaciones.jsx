import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { 
  MdSearch, 
  MdFilterList, 
  MdVisibility,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdDownload,
  MdClose,
  MdPerson,
  MdCalendarToday,
  MdDescription
} from 'react-icons/md';
import './Justificaciones.css';

export default function Justificaciones() {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [justificacionSeleccionada, setJustificacionSeleccionada] = useState(null);

  // Datos de ejemplo - Estructura según tu BD
  const [justificaciones, setJustificaciones] = useState([
    {
      id: 1,
      asistencia_id: 15,
      asistencia: {
        id: 15,
        alumno_id: 3,
        alumno: {
          id: 3,
          usuario: {
            username: '2021003',
            nombre: 'Carlos Rodríguez Silva'
          }
        },
        materia_id: 1,
        grupo_id: 1,
        fecha: '2024-01-15',
        estado: 'ausente'
      },
      documento_url: '/uploads/justificacion_1.pdf',
      estado: 'pendiente', // pendiente, aprobado, rechazado
      fecha_solicitud: '2024-01-16',
      motivo: 'Cita médica por enfermedad. Adjunto comprobante del hospital.',
      comentario_maestro: null
    },
    {
      id: 2,
      asistencia_id: 18,
      asistencia: {
        id: 18,
        alumno_id: 5,
        alumno: {
          id: 5,
          usuario: {
            username: '2021005',
            nombre: 'Luis González Torres'
          }
        },
        materia_id: 1,
        grupo_id: 2,
        fecha: '2024-01-14',
        estado: 'ausente'
      },
      documento_url: '/uploads/justificacion_2.pdf',
      estado: 'pendiente',
      fecha_solicitud: '2024-01-15',
      motivo: 'Trámites escolares en el edificio de control escolar.',
      comentario_maestro: null
    },
    {
      id: 3,
      asistencia_id: 22,
      asistencia: {
        id: 22,
        alumno_id: 8,
        alumno: {
          id: 8,
          usuario: {
            username: '2021008',
            nombre: 'Laura Ramírez Gómez'
          }
        },
        materia_id: 2,
        grupo_id: 3,
        fecha: '2024-01-13',
        estado: 'justificado'
      },
      documento_url: '/uploads/justificacion_3.pdf',
      estado: 'aprobado',
      fecha_solicitud: '2024-01-14',
      motivo: 'Emergencia familiar.',
      comentario_maestro: 'Justificación aprobada. Documentación correcta.'
    },
    {
      id: 4,
      asistencia_id: 25,
      asistencia: {
        id: 25,
        alumno_id: 10,
        alumno: {
          id: 10,
          usuario: {
            username: '2021010',
            nombre: 'Pedro Martínez López'
          }
        },
        materia_id: 1,
        grupo_id: 1,
        fecha: '2024-01-12',
        estado: 'ausente'
      },
      documento_url: null,
      estado: 'rechazado',
      fecha_solicitud: '2024-01-13',
      motivo: 'Transporte público con retraso.',
      comentario_maestro: 'No se adjuntó documentación de respaldo.'
    }
  ]);

  // Filtrar justificaciones
  const justificacionesFiltradas = justificaciones.filter(just => {
    const matchSearch = just.asistencia.alumno.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       just.asistencia.alumno.usuario.username.includes(searchTerm);
    const matchEstado = estadoFiltro === 'todos' || just.estado === estadoFiltro;
    return matchSearch && matchEstado;
  });

  const handleVerDetalle = (justificacion) => {
    setJustificacionSeleccionada(justificacion);
    setModalVisible(true);
  };

  const handleAprobar = async (justificacionId) => {
    setJustificaciones(prev => 
      prev.map(j => 
        j.id === justificacionId 
          ? { ...j, estado: 'aprobado', comentario_maestro: 'Justificación aprobada.' }
          : j
      )
    );
    setModalVisible(false);
    // API: PUT /api/justificaciones/:id { estado: 'aprobado', comentario_maestro: '...' }
  };

  const handleRechazar = async (justificacionId, comentario) => {
    setJustificaciones(prev => 
      prev.map(j => 
        j.id === justificacionId 
          ? { ...j, estado: 'rechazado', comentario_maestro: comentario }
          : j
      )
    );
    setModalVisible(false);
    // API: PUT /api/justificaciones/:id { estado: 'rechazado', comentario_maestro: '...' }
  };

  // Resumen
  const resumen = {
    pendientes: justificaciones.filter(j => j.estado === 'pendiente').length,
    aprobadas: justificaciones.filter(j => j.estado === 'aprobado').length,
    rechazadas: justificaciones.filter(j => j.estado === 'rechazado').length,
    total: justificaciones.length
  };

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'pendiente': return 'estado-pendiente';
      case 'aprobado': return 'estado-aprobado';
      case 'rechazado': return 'estado-rechazado';
      default: return '';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'pendiente': return <MdPending />;
      case 'aprobado': return <MdCheckCircle />;
      case 'rechazado': return <MdCancel />;
      default: return null;
    }
  };

  const getEstadoLabel = (estado) => {
    const labels = {
      pendiente: 'Pendiente',
      aprobado: 'Aprobada',
      rechazado: 'Rechazada'
    };
    return labels[estado] || estado;
  };

  return (
    <MainLayout title="Justificaciones" userName="Profesor García">
      <div className="justificaciones-container">
        
        {/* Resumen */}
        <div className="resumen-grid">
          <div className="resumen-card resumen-pendiente">
            <div className="resumen-icon">
              <MdPending size={32} />
            </div>
            <div className="resumen-content">
              <span className="resumen-valor">{resumen.pendientes}</span>
              <span className="resumen-label">Pendientes</span>
            </div>
          </div>

          <div className="resumen-card resumen-aprobada">
            <div className="resumen-icon">
              <MdCheckCircle size={32} />
            </div>
            <div className="resumen-content">
              <span className="resumen-valor">{resumen.aprobadas}</span>
              <span className="resumen-label">Aprobadas</span>
            </div>
          </div>

          <div className="resumen-card resumen-rechazada">
            <div className="resumen-icon">
              <MdCancel size={32} />
            </div>
            <div className="resumen-content">
              <span className="resumen-valor">{resumen.rechazadas}</span>
              <span className="resumen-label">Rechazadas</span>
            </div>
          </div>

          <div className="resumen-card resumen-total">
            <div className="resumen-icon">
              <MdDescription size={32} />
            </div>
            <div className="resumen-content">
              <span className="resumen-valor">{resumen.total}</span>
              <span className="resumen-label">Total</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o matrícula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="toolbar-actions">
            <select 
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="select-filtro"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobado">Aprobadas</option>
              <option value="rechazado">Rechazadas</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="table-container">
          <table className="justificaciones-table">
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Matrícula</th>
                <th>Fecha de Falta</th>
                <th>Fecha de Solicitud</th>
                <th>Estado</th>
                <th>Documento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {justificacionesFiltradas.map(just => (
                <tr key={just.id}>
                  <td className="td-alumno">
                    <div className="alumno-info">
                      <div className="alumno-avatar">
                        {just.asistencia.alumno.usuario.nombre.charAt(0)}
                      </div>
                      <span>{just.asistencia.alumno.usuario.nombre}</span>
                    </div>
                  </td>
                  <td className="td-matricula">
                    {just.asistencia.alumno.usuario.username}
                  </td>
                  <td className="td-fecha">
                    {new Date(just.asistencia.fecha).toLocaleDateString('es-MX')}
                  </td>
                  <td className="td-fecha">
                    {new Date(just.fecha_solicitud).toLocaleDateString('es-MX')}
                  </td>
                  <td>
                    <span className={`estado-badge ${getEstadoBadgeClass(just.estado)}`}>
                      {getEstadoIcon(just.estado)}
                      {getEstadoLabel(just.estado)}
                    </span>
                  </td>
                  <td className="td-documento">
                    {just.documento_url ? (
                      <a 
                        href={just.documento_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-documento"
                      >
                        <MdDownload size={16} />
                        Ver
                      </a>
                    ) : (
                      <span className="sin-documento">Sin documento</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleVerDetalle(just)}
                      className="btn-ver-detalle"
                    >
                      <MdVisibility size={18} />
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {justificacionesFiltradas.length === 0 && (
            <div className="no-data">
              No se encontraron justificaciones con los criterios de búsqueda
            </div>
          )}
        </div>

        {/* Modal de Detalle */}
        {modalVisible && justificacionSeleccionada && (
          <DetalleJustificacionModal
            justificacion={justificacionSeleccionada}
            onClose={() => setModalVisible(false)}
            onAprobar={handleAprobar}
            onRechazar={handleRechazar}
          />
        )}
      </div>
    </MainLayout>
  );
}

// ============================================
// Modal de Detalle
// ============================================
function DetalleJustificacionModal({ justificacion, onClose, onAprobar, onRechazar }) {
  const [comentario, setComentario] = useState('');
  const [accion, setAccion] = useState(null); // 'aprobar' o 'rechazar'

  const handleConfirmar = () => {
    if (accion === 'aprobar') {
      onAprobar(justificacion.id);
    } else if (accion === 'rechazar') {
      if (!comentario.trim()) {
        alert('Debes ingresar un comentario para rechazar');
        return;
      }
      onRechazar(justificacion.id, comentario);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Detalle de Justificación</h2>
          <button className="btn-close-modal" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Info del Alumno */}
          <div className="detalle-section">
            <h3 className="section-title">
              <MdPerson size={20} />
              Información del Alumno
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Nombre:</span>
                <span className="info-value">{justificacion.asistencia.alumno.usuario.nombre}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Matrícula:</span>
                <span className="info-value">{justificacion.asistencia.alumno.usuario.username}</span>
              </div>
            </div>
          </div>

          {/* Info de la Falta */}
          <div className="detalle-section">
            <h3 className="section-title">
              <MdCalendarToday size={20} />
              Detalles de la Falta
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Fecha de la falta:</span>
                <span className="info-value">
                  {new Date(justificacion.asistencia.fecha).toLocaleDateString('es-MX')}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Fecha de solicitud:</span>
                <span className="info-value">
                  {new Date(justificacion.fecha_solicitud).toLocaleDateString('es-MX')}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado actual:</span>
                <span className={`estado-badge ${
                  justificacion.estado === 'pendiente' ? 'estado-pendiente' :
                  justificacion.estado === 'aprobado' ? 'estado-aprobado' :
                  'estado-rechazado'
                }`}>
                  {justificacion.estado === 'pendiente' && <MdPending />}
                  {justificacion.estado === 'aprobado' && <MdCheckCircle />}
                  {justificacion.estado === 'rechazado' && <MdCancel />}
                  {justificacion.estado === 'pendiente' ? 'Pendiente' :
                   justificacion.estado === 'aprobado' ? 'Aprobada' : 'Rechazada'}
                </span>
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div className="detalle-section">
            <h3 className="section-title">
              <MdDescription size={20} />
              Motivo de la Justificación
            </h3>
            <div className="motivo-text">
              {justificacion.motivo}
            </div>
          </div>

          {/* Documento */}
          {justificacion.documento_url && (
            <div className="detalle-section">
              <h3 className="section-title">
                <MdDownload size={20} />
                Documento Adjunto
              </h3>
              <a 
                href={justificacion.documento_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-descargar-doc"
              >
                <MdDownload size={20} />
                Descargar Documento
              </a>
            </div>
          )}

          {/* Comentario del Maestro */}
          {justificacion.comentario_maestro && (
            <div className="detalle-section">
              <h3 className="section-title">Comentario del Maestro</h3>
              <div className="comentario-text">
                {justificacion.comentario_maestro}
              </div>
            </div>
          )}

          {/* Acciones (solo si está pendiente) */}
          {justificacion.estado === 'pendiente' && (
            <div className="detalle-section">
              <h3 className="section-title">Acciones</h3>
              
              {accion === 'rechazar' && (
                <div className="form-group">
                  <label className="form-label">Comentario (requerido para rechazar):</label>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    placeholder="Escribe el motivo del rechazo..."
                  />
                </div>
              )}

              <div className="modal-actions">
                {!accion && (
                  <>
                    <button
                      onClick={() => setAccion('aprobar')}
                      className="btn-modal btn-aprobar"
                    >
                      <MdCheckCircle size={20} />
                      Aprobar
                    </button>
                    <button
                      onClick={() => setAccion('rechazar')}
                      className="btn-modal btn-rechazar"
                    >
                      <MdCancel size={20} />
                      Rechazar
                    </button>
                  </>
                )}

                {accion && (
                  <>
                    <button
                      onClick={handleConfirmar}
                      className="btn-modal btn-confirmar"
                    >
                      <MdCheckCircle size={20} />
                      Confirmar {accion === 'aprobar' ? 'Aprobación' : 'Rechazo'}
                    </button>
                    <button
                      onClick={() => {
                        setAccion(null);
                        setComentario('');
                      }}
                      className="btn-modal btn-cancelar"
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}