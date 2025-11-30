import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoUteq from "../../assets/images/logoUTEQcolor.png";

import {
  MdDashboard,
  MdAssignment,
  MdQrCode,
  MdList,
  MdFactCheck,
  MdBarChart,
  MdPerson,
} from "react-icons/md";

import "./Sidebar.css";

export default function SidebarMaestro({ userName = "Maestro" }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/maestro/dashboard",
    },
    {
      name: "Mis Asignaciones",
      icon: <MdAssignment />,
      path: "/maestro/asignaciones",
    },
    {
      name: "Generar QR",
      icon: <MdQrCode />,
      path: "/maestro/qr",
    },
    {
      name: "Listas de Asistencia",
      icon: <MdList />,
      path: "/maestro/asistencia",
    },
    {
      name: "Justificaciones",
      icon: <MdFactCheck />,
      path: "/maestro/justificaciones",
    },
    {
      name: "Reportes",
      icon: <MdBarChart />,
      path: "/maestro/reportes",
    },
    {
      name: "Mi Perfil",
      icon: <MdPerson />,
      path: "/maestro/perfil",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logoUteq} alt="Logo UTEQ" />
      </div>

      {/* Bienvenida */}
      <div className="sidebar-greeting">
        <p className="greeting-text">Bienvenido</p>
        <p className="greeting-name">{userName}</p>
      </div>

      {/* Menú */}
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`menu-item ${isActive(item.path) ? "active" : ""}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>Sistema de Asistencia UTEQ ©</p>
      </div>
    </div>
  );
}
