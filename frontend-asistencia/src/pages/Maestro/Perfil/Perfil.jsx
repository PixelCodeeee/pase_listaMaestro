import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import './Perfil.css';

export default function Perfil() {
  const [perfilData, setPerfilData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [cambiarPassword, setCambiarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Estados para edición
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    foto: null
  });

  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNueva: '',
    passwordConfirmar: ''
  });

  // Estados para notificaciones
  const [notificaciones, setNotificaciones] = useState({
    emailAsistencia: true,
    emailJustificaciones: true,
    pushNotifications: false
  });

  // Cargar datos del perfil al montar
  useEffect(() => {
    cargarPerfil();
  }, []);

  // API: Cargar perfil del maestro
  const cargarPerfil = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con tu endpoint real
      // const response = await fetch('/api/maestro/perfil', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();

      // Datos de ejemplo
      const data = {
        id: 'M12345',
        nombre: 'Dr. Juan García Pérez',
        email: 'juan.garcia@universidad.edu',
        telefono: '+52 442 123 4567',
        division: 'Ingeniería',
        departamento: 'Ciencias de la Computación',
        foto: 'https://ui-avatars.com/api/?name=Juan+Garcia&size=200&background=002F6C&color=fff',
        fechaIngreso: '2018-08-15',
        materiasActivas: 4,
        gruposActivos: 8
      };

      setPerfilData(data);
      setFormData({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        foto: data.foto
      });
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      mostrarMensaje('error', 'Error al cargar la información del perfil');
    } finally {
      setLoading(false);
    }
  };

  // API: Actualizar perfil
  const actualizarPerfil = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con tu endpoint real
      // const response = await fetch('/api/maestro/perfil', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // Simulación
      setPerfilData({ ...perfilData, ...formData });
      setEditMode(false);
      mostrarMensaje('success', 'Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      mostrarMensaje('error', 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  // API: Cambiar contraseña
  const cambiarContrasena = async () => {
    if (passwordData.passwordNueva !== passwordData.passwordConfirmar) {
      mostrarMensaje('error', 'Las contraseñas no coinciden');
      return;
    }

    if (passwordData.passwordNueva.length < 8) {
      mostrarMensaje('error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      setLoading(true);
      // TODO: Reemplazar con tu endpoint real
      // const response = await fetch('/api/maestro/cambiar-password', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     passwordActual: passwordData.passwordActual,
      //     passwordNueva: passwordData.passwordNueva
      //   })
      // });

      setCambiarPassword(false);
      setPasswordData({ passwordActual: '', passwordNueva: '', passwordConfirmar: '' });
      mostrarMensaje('success', 'Contraseña actualizada correctamente');
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      mostrarMensaje('error', 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  // API: Actualizar notificaciones
  const actualizarNotificaciones = async (key, value) => {
    const nuevasNotificaciones = { ...notificaciones, [key]: value };
    setNotificaciones(nuevasNotificaciones);

    try {
      // TODO: Reemplazar con tu endpoint real
      // await fetch('/api/maestro/notificaciones', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(nuevasNotificaciones)
      // });

      mostrarMensaje('success', 'Preferencias actualizadas');
    } catch (error) {
      console.error('Error al actualizar notificaciones:', error);
      setNotificaciones(notificaciones);
      mostrarMensaje('error', 'Error al actualizar preferencias');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 4000);
  };

  if (loading && !perfilData) {
    return (
      <MainLayout title="Mi Perfil" userName="Profesor García">
        <div className="perfil-container">
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Cargando perfil...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Mi Perfil" userName="Profesor García">
      <div className="perfil-container">
        
        {mensaje.texto && (
          <div className={`mensaje-alert ${mensaje.tipo}`}>
            {mensaje.tipo === 'success' ? '✓' : '⚠'} {mensaje.texto}
          </div>
        )}

        <div className="perfil-card perfil-header">
          <div className="perfil-foto-section">
            <div className="foto-wrapper">
              <img 
                src={formData.foto || perfilData?.foto} 
                alt="Foto de perfil" 
                className="perfil-foto"
              />
              {editMode && (
                <button className="cambiar-foto-btn" title="Cambiar foto">
                  
                </button>
              )}
            </div>
          </div>

          <div className="perfil-info-section">
            {!editMode ? (
              <>
                <h2 className="perfil-nombre">{perfilData?.nombre}</h2>
                <div className="perfil-detalles">
                  <div className="detalle-item">
                   
                    <span className="detalle-label">ID:</span>
                    <span className="detalle-valor">{perfilData?.id}</span>
                  </div>
                  <div className="detalle-item">
                   
                    <span className="detalle-label">Email:</span>
                    <span className="detalle-valor">{perfilData?.email}</span>
                  </div>
                  <div className="detalle-item">
                  
                    <span className="detalle-label">Teléfono:</span>
                    <span className="detalle-valor">{perfilData?.telefono}</span>
                  </div>
                  <div className="detalle-item">
                
                    <span className="detalle-label">División:</span>
                    <span className="detalle-valor">{perfilData?.division}</span>
                  </div>
                  <div className="detalle-item">
                   
                    <span className="detalle-label">Departamento:</span>
                    <span className="detalle-valor">{perfilData?.departamento}</span>
                  </div>
                </div>
                <button 
                  className="btn-editar"
                  onClick={() => setEditMode(true)}
                >
                   Editar Perfil
                </button>
              </>
            ) : (
              <div className="form-editar">
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button 
                    className="btn-guardar" 
                    disabled={loading}
                    onClick={actualizarPerfil}
                  >
                    {loading ? 'Guardando...' : ' Guardar Cambios'}
                  </button>
                  <button 
                    className="btn-cancelar"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        nombre: perfilData.nombre,
                        email: perfilData.email,
                        telefono: perfilData.telefono,
                        foto: perfilData.foto
                      });
                    }}
                  >
                    ✖ Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon"></div>
            <div className="info-content">
              <div className="info-label">Fecha de Ingreso</div>
              <div className="info-valor">
                {new Date(perfilData?.fechaIngreso).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"></div>
            <div className="info-content">
              <div className="info-label">Materias Activas</div>
              <div className="info-valor">{perfilData?.materiasActivas}</div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"></div>
            <div className="info-content">
              <div className="info-label">Grupos Activos</div>
              <div className="info-valor">{perfilData?.gruposActivos}</div>
            </div>
          </div>
        </div>

        <div className="perfil-card">
          <h3 className="section-title"> Seguridad</h3>
          
          {!cambiarPassword ? (
            <button 
              className="btn-cambiar-password"
              onClick={() => setCambiarPassword(true)}
            >
               Cambiar Contraseña
            </button>
          ) : (
            <div className="form-password">
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  name="passwordActual"
                  value={passwordData.passwordActual}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="passwordNueva"
                  value={passwordData.passwordNueva}
                  onChange={handlePasswordChange}
                />
                <small>Mínimo 8 caracteres</small>
              </div>
              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  name="passwordConfirmar"
                  value={passwordData.passwordConfirmar}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-actions">
                <button 
                  className="btn-guardar" 
                  disabled={loading}
                  onClick={cambiarContrasena}
                >
                  {loading ? 'Actualizando...' : ' Actualizar Contraseña'}
                </button>
                <button 
                  className="btn-cancelar"
                  onClick={() => {
                    setCambiarPassword(false);
                    setPasswordData({ passwordActual: '', passwordNueva: '', passwordConfirmar: '' });
                  }}
                >
                  ✖ Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="perfil-card">
          <h3 className="section-title"> Preferencias de Notificaciones</h3>
          
          <div className="notificaciones-list">
            <div className="notificacion-item">
              <div className="notificacion-info">
                <div className="notificacion-titulo">Notificaciones de Asistencia</div>
                <div className="notificacion-descripcion">
                  Recibe alertas cuando haya problemas de asistencia
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificaciones.emailAsistencia}
                  onChange={(e) => actualizarNotificaciones('emailAsistencia', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notificacion-item">
              <div className="notificacion-info">
                <div className="notificacion-titulo">Justificaciones Nuevas</div>
                <div className="notificacion-descripcion">
                  Recibe notificaciones de nuevas justificaciones pendientes
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificaciones.emailJustificaciones}
                  onChange={(e) => actualizarNotificaciones('emailJustificaciones', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notificacion-item">
              <div className="notificacion-info">
                <div className="notificacion-titulo">Notificaciones Push</div>
                <div className="notificacion-descripcion">
                  Recibe notificaciones en tiempo real en tu dispositivo
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificaciones.pushNotifications}
                  onChange={(e) => actualizarNotificaciones('pushNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}