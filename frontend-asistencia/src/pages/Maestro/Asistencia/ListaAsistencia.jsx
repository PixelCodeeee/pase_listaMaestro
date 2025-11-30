import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { 
  MdSearch, 
  MdFilterList, 
  MdDownload, 
  MdCheckCircle, 
  MdCancel, 
  MdCheckBox,
  MdCalendarToday,
  MdPeople
} from 'react-icons/md';
import './ListaAsistencia.css';

export default function ListaAsistencia() {
  const [filtros, setFiltros] = useState({
    materiaId: '',
    grupoId: '',
    fecha: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [listaVisible, setListaVisible] = useState(false);

  // Datos de ejemplo
  const materias = [
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Física' },
    { id: 3, nombre: 'Química' }
  ];

  const grupos = [
    { id: 1, nombre: 'A-101', materiaId: 1 },
    { id: 2, nombre: 'A-102', materiaId: 1 },
    { id: 3, nombre: 'B-201', materiaId: 2 }
  ];

  // Datos de ejemplo - Estructura según tu BD
  const [asistencias, setAsistencias] = useState([
    { 
      id: 1, 
      alumno_id: 1,
      alumno: { 
        id: 1, 
        usuario: { 
          id: 1,
          username: '2021001',  // La matrícula está en username
          nombre: 'Juan Pérez García',
          email: 'juan.perez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: '07:05:00',
      estado: 'presente',
      qr_token: 'abc123'
    },
    { 
      id: 2, 
      alumno_id: 2,
      alumno: { 
        id: 2, 
        usuario: { 
          id: 2,
          username: '2021002',
          nombre: 'María López Martínez',
          email: 'maria.lopez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: '07:03:00',
      estado: 'presente',
      qr_token: 'abc124'
    },
    { 
      id: 3, 
      alumno_id: 3,
      alumno: { 
        id: 3, 
        usuario: { 
          id: 3,
          username: '2021003',
          nombre: 'Carlos Rodríguez Silva',
          email: 'carlos.rodriguez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: null,
      estado: 'ausente',
      qr_token: null
    },
    { 
      id: 4, 
      alumno_id: 4,
      alumno: { 
        id: 4, 
        usuario: { 
          id: 4,
          username: '2021004',
          nombre: 'Ana Hernández Ruiz',
          email: 'ana.hernandez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: null,
      estado: 'justificado',
      qr_token: null
    },
    { 
      id: 5, 
      alumno_id: 5,
      alumno: { 
        id: 5, 
        usuario: { 
          id: 5,
          username: '2021005',
          nombre: 'Luis González Torres',
          email: 'luis.gonzalez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: '07:25:00',
      estado: 'presente',
      qr_token: 'abc125'
    },
    { 
      id: 6, 
      alumno_id: 6,
      alumno: { 
        id: 6, 
        usuario: { 
          id: 6,
          username: '2021006',
          nombre: 'Sofia Martínez López',
          email: 'sofia.martinez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: '07:02:00',
      estado: 'presente',
      qr_token: 'abc126'
    },
    { 
      id: 7, 
      alumno_id: 7,
      alumno: { 
        id: 7, 
        usuario: { 
          id: 7,
          username: '2021007',
          nombre: 'Diego Sánchez Pérez',
          email: 'diego.sanchez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: '07:08:00',
      estado: 'presente',
      qr_token: 'abc127'
    },
    { 
      id: 8, 
      alumno_id: 8,
      alumno: { 
        id: 8, 
        usuario: { 
          id: 8,
          username: '2021008',
          nombre: 'Laura Ramírez Gómez',
          email: 'laura.ramirez@ejemplo.com'
        } 
      },
      materia_id: 1,
      grupo_id: 1,
      fecha: '2024-01-15',
      hora: null,
      estado: 'ausente',
      qr_token: null
    }
  ]);

  const gruposFiltrados = grupos.filter(g => g.materiaId === parseInt(filtros.materiaId));

  const asistenciasFiltradas = asistencias.filter(asistencia =>
    asistencia.alumno.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asistencia.alumno.usuario.username.includes(searchTerm)  // Buscar por username (matrícula)
  );

  const handleVerLista = () => {
    if (filtros.materiaId && filtros.grupoId && filtros.fecha) {
      setListaVisible(true);
    }
  };

  const cambiarEstado = (asistenciaId, nuevoEstado) => {
    setAsistencias(prevAsistencias => 
      prevAsistencias.map(asistencia => 
        asistencia.id === asistenciaId 
          ? { 
              ...asistencia, 
              estado: nuevoEstado,
              hora: nuevoEstado === 'presente' 
                ? new Date().toLocaleTimeString('es-MX', { hour12: false })
                : null
            }
          : asistencia
      )
    );
    // Aquí harías la llamada a tu API:
    // await fetch(`/api/asistencias/${asistenciaId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ estado: nuevoEstado, hora: ... })
    // });
  };

  const marcarTodosPresentes = () => {
    const horaActual = new Date().toLocaleTimeString('es-MX', { hour12: false });
    setAsistencias(prevAsistencias => 
      prevAsistencias.map(asistencia => ({
        ...asistencia,
        estado: 'presente',
        hora: horaActual
      }))
    );
    // Aquí harías la llamada a tu API:
    // await fetch(`/api/asistencias/bulk-update`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ grupo_id: filtros.grupoId, fecha: filtros.fecha, estado: 'presente' })
    // });
  };

  const descargarLista = () => {
    console.log('Descargar lista');
  };

  // Calcular resumen
  const resumen = {
    presentes: asistenciasFiltradas.filter(a => a.estado === 'presente').length,
    ausentes: asistenciasFiltradas.filter(a => a.estado === 'ausente').length,
    justificados: asistenciasFiltradas.filter(a => a.estado === 'justificado').length,
    total: asistenciasFiltradas.length
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'presente':
        return <MdCheckCircle className="estado-icon presente" />;
      case 'ausente':
        return <MdCancel className="estado-icon ausente" />;
      case 'justificado':
        return <MdCheckBox className="estado-icon justificado" />;
      default:
        return null;
    }
  };

  const getEstadoLabel = (estado) => {
    const labels = {
      presente: 'Presente',
      ausente: 'Ausente',
      justificado: 'Justificado'
    };
    return labels[estado] || estado;
  };

  return (
    <MainLayout title="Listas de Asistencia" userName="Profesor García">
      <div className="lista-asistencia-container">
        
        {/* Filtros */}
        <div className="filtros-card">
          <div className="filtros-header">
            <MdFilterList className="filtros-icon" size={24} />
            <h2 className="filtros-title">Filtrar Lista de Asistencia</h2>
          </div>

          <div className="filtros-grid">
            <div className="form-group">
              <label className="form-label">Materia *</label>
              <select
                value={filtros.materiaId}
                onChange={(e) => setFiltros({ ...filtros, materiaId: e.target.value, grupoId: '' })}
                className="form-select"
              >
                <option value="">Seleccionar materia...</option>
                {materias.map(m => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Grupo *</label>
              <select
                value={filtros.grupoId}
                onChange={(e) => setFiltros({ ...filtros, grupoId: e.target.value })}
                className="form-select"
                disabled={!filtros.materiaId}
              >
                <option value="">Seleccionar grupo...</option>
                {gruposFiltrados.map(g => (
                  <option key={g.id} value={g.id}>{g.nombre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Fecha *</label>
              <input
                type="date"
                value={filtros.fecha}
                onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
                className="form-select"
              />
            </div>
          </div>

          <button 
            onClick={handleVerLista}
            className="btn-ver-lista"
            disabled={!filtros.materiaId || !filtros.grupoId || !filtros.fecha}
          >
            <MdCalendarToday size={20} />
            Ver Lista de Asistencia
          </button>
        </div>

        {/* Lista de Asistencia */}
        {listaVisible && (
          <>
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
                <button onClick={marcarTodosPresentes} className="btn-action btn-marcar-todos">
                  <MdCheckBox size={20} />
                  Marcar Todos Presentes
                </button>
                <button onClick={descargarLista} className="btn-action btn-descargar">
                  <MdDownload size={20} />
                  Descargar
                </button>
              </div>
            </div>

            {/* Resumen */}
            <div className="resumen-grid">
              <div className="resumen-card resumen-presente">
                <div className="resumen-icon">
                  <MdCheckCircle size={32} />
                </div>
                <div className="resumen-content">
                  <span className="resumen-valor">{resumen.presentes}</span>
                  <span className="resumen-label">Presentes</span>
                </div>
              </div>

              <div className="resumen-card resumen-ausente">
                <div className="resumen-icon">
                  <MdCancel size={32} />
                </div>
                <div className="resumen-content">
                  <span className="resumen-valor">{resumen.ausentes}</span>
                  <span className="resumen-label">Ausentes</span>
                </div>
              </div>

              <div className="resumen-card resumen-justificado">
                <div className="resumen-icon">
                  <MdCheckBox size={32} />
                </div>
                <div className="resumen-content">
                  <span className="resumen-valor">{resumen.justificados}</span>
                  <span className="resumen-label">Justificados</span>
                </div>
              </div>

              <div className="resumen-card resumen-total">
                <div className="resumen-icon">
                  <MdPeople size={32} />
                </div>
                <div className="resumen-content">
                  <span className="resumen-valor">{resumen.total}</span>
                  <span className="resumen-label">Total</span>
                </div>
              </div>
            </div>

            {/* Tabla */}
            <div className="table-container">
              <table className="asistencia-table">
                <thead>
                  <tr>
                    <th>Matrícula</th>
                    <th>Nombre Completo</th>
                    <th>Estado</th>
                    <th>Hora de Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {asistenciasFiltradas.map(asistencia => (
                    <tr key={asistencia.id}>
                      <td className="td-matricula">{asistencia.alumno.usuario.username}</td>
                      <td className="td-nombre">
                        <div className="alumno-info">
                          <div className="alumno-avatar">
                            {asistencia.alumno.usuario.nombre.charAt(0)}
                          </div>
                          <span>{asistencia.alumno.usuario.nombre}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`estado-badge estado-${asistencia.estado}`}>
                          {getEstadoIcon(asistencia.estado)}
                          {getEstadoLabel(asistencia.estado)}
                        </span>
                      </td>
                      <td className="td-hora">
                        {asistencia.hora || '-'}
                      </td>
                      <td>
                        <select
                          value={asistencia.estado}
                          onChange={(e) => cambiarEstado(asistencia.id, e.target.value)}
                          className="select-estado"
                        >
                          <option value="presente">Presente</option>
                          <option value="ausente">Ausente</option>
                          <option value="justificado">Justificado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {asistenciasFiltradas.length === 0 && (
                <div className="no-data">
                  No se encontraron registros de asistencia con los criterios de búsqueda
                </div>
              )}
            </div>
          </>
        )}

        {/* Empty State */}
        {!listaVisible && (
          <div className="empty-state">
            <MdCalendarToday className="empty-icon" size={80} />
            <h3 className="empty-title">Selecciona los filtros</h3>
            <p className="empty-text">
              Elige una materia, grupo y fecha para ver la lista de asistencia
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
