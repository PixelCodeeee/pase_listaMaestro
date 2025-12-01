import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import logoUteq from "../../assets/images/logo-uteq.png";
import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showLogo = true,
}) {
  // cierra modal con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cerrar */}
        <button className="modal-close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {showLogo && (
          <div className="modal-logo">
            <div className="logo-placeholder">
              <img
                src={logoUteq}
                alt="Logo UTEQ"
                style={{ width: "120px", height: "auto" }}
              />
            </div>
          </div>
        )}

        {title && <h2 className="modal-title">{title}</h2>}

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
