import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { MdQrCode2, MdRefresh, MdDownload } from 'react-icons/md';
import './GenerarQR.css';

export default function GenerarQR() {
  const [formData, setFormData] = useState({ materiaId: '', grupoId: '' });
  const [qrGenerated, setQrGenerated] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutos en segundos

  const materias = [
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Física' },
    { id: 3, nombre: 'Química' }
  ];

  const grupos = [
    { id: 1, nombre: 'A-101', materiaId: 1 },
    { id: 2, nombre: 'A-102', materiaId: 1 },
    { id: 3, nombre: 'B-201', materiaId: 2 },
    { id: 4, nombre: 'B-202', materiaId: 2 },
    { id: 5, nombre: 'C-301', materiaId: 3 }
  ];

  const gruposFiltrados = grupos.filter(g => g.materiaId === parseInt(formData.materiaId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.materiaId && formData.grupoId) {
      setQrGenerated(true);
      setTimer(300); // Reset timer
    }
  };

  const handleRegenerar = () => {
    setTimer(300);
    // Aquí llamarías a tu API para regenerar el QR
  };

  const handleDescargar = () => {
    // Aquí implementarías la descarga del QR
    alert('Descargando QR...');
  };

  const materiaNombre = materias.find(m => m.id === parseInt(formData.materiaId))?.nombre;
  const grupoNombre = grupos.find(g => g.id === parseInt(formData.grupoId))?.nombre;

  return (
    <MainLayout title="Generar Código QR" userName="Profesor García">
      <div className="generar-qr-container">
        
        {/* Formulario */}
        <div className="qr-form-card">
          <div className="form-header">
            <MdQrCode2 className="form-icon" size={24} />
            <h2 className="form-title">Generar Código QR</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Materia *</label>
              <select 
                value={formData.materiaId} 
                onChange={(e) => setFormData({ materiaId: e.target.value, grupoId: '' })}
                className="form-select"
                required
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
                value={formData.grupoId} 
                onChange={(e) => setFormData({ ...formData, grupoId: e.target.value })}
                className="form-select"
                required 
                disabled={!formData.materiaId}
              >
                <option value="">Seleccionar grupo...</option>
                {gruposFiltrados.map(g => (
                  <option key={g.id} value={g.id}>{g.nombre}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-generar">
              <MdQrCode2 size={20} />
              Generar Código QR
            </button>
          </form>
        </div>

        {/* QR Generado */}
        {qrGenerated && (
          <div className="qr-display-card">
            <div className="qr-header">
              <h3 className="qr-title">Código QR Activo</h3>
              <span className={`qr-status ${timer > 60 ? 'activo' : 'expirando'}`}>
                {timer > 60 ? 'Activo' : 'Por expirar'}
              </span>
            </div>

            {/* Área del QR */}
            <div className="qr-display">
              <div className="qr-placeholder">
                <MdQrCode2 size={200} className="qr-icon-placeholder" />
              </div>
            </div>

            {/* Info del QR */}
            <div className="qr-info">
              <div className="info-row">
                <span className="info-label">Materia:</span>
                <span className="info-value">{materiaNombre}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Grupo:</span>
                <span className="info-value">{grupoNombre}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Fecha:</span>
                <span className="info-value">{new Date().toLocaleDateString('es-MX')}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Hora:</span>
                <span className="info-value">{new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            {/* Timer */}
            <div className="qr-timer">
              <span className="timer-label">QR válido por:</span>
              <span className="timer-value">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')} min
              </span>
            </div>

            {/* Acciones */}
            <div className="qr-actions">
              <button onClick={handleRegenerar} className="btn-action btn-regenerar">
                <MdRefresh size={20} />
                Regenerar QR
              </button>
              <button onClick={handleDescargar} className="btn-action btn-descargar">
                <MdDownload size={20} />
                Descargar
              </button>
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="instrucciones-card">
          <h3 className="instrucciones-title">Instrucciones</h3>
          <ol className="instrucciones-list">
            <li>Selecciona la materia y el grupo correspondiente</li>
            <li>Presiona "Generar Código QR"</li>
            <li>Muestra el código QR a los alumnos para que lo escaneen</li>
            <li>El código expira después de 5 minutos por seguridad</li>
            <li>Puedes regenerar el código en cualquier momento</li>
          </ol>
        </div>
      </div>
    </MainLayout>
  );
}