import React, { useEffect } from 'react';
import { IoClose, IoWarning } from 'react-icons/io5';
import logoUteq from '../../assets/images/logo-uteq.png';
import './ConfirmModal.css';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "¿Dar de baja este programa?",
  message,
  itemName,
  confirmText = "Sí, dar de baja",
  cancelText = "Cancelar",
  isLoading = false
}) {
  // Cerrar con tecla esc
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="confirm-modal-close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className="confirm-modal-logo">
          <img src={logoUteq} alt="UTEQ" />
        </div>

        <h2 className="confirm-modal-title">{title}</h2>

        <div className="confirm-modal-warning">
          <IoWarning className="warning-icon" />
        </div>

        <div className="confirm-modal-message">
          <p className="message-main">
            Estás a punto de desactivar el programa:
          </p>
          {itemName && (
            <p className="message-item-name">{itemName}</p>
          )}
          {message && (
            <p className="message-additional">{message}</p>
          )}
        </div>

        <div className="confirm-modal-buttons">
          <button 
            className="btn-confirm-action"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : confirmText}
          </button>
          <button 
            className="btn-confirm-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}