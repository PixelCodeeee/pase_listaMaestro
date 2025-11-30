import React, { useState, useEffect } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Reportes.css";

// Registrar componentes de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Reportes() {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [rangoFecha, setRangoFecha] = useState("semanal");
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datosReporte, setDatosReporte] = useState(null);

  // Cargar grupos del maestro al montar el componente
  useEffect(() => {
    cargarGruposDelMaestro();
  }, []);

  // Cargar datos del reporte cuando cambia el grupo o rango de fecha
  useEffect(() => {
    if (grupoSeleccionado) {
      cargarDatosReporte();
    }
  }, [grupoSeleccionado, rangoFecha]);

  // API: Cargar grupos del maestro
  const cargarGruposDelMaestro = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con tu endpoint real
      // const response = await fetch('/api/maestro/grupos', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      
      // Datos de ejemplo - reemplazar con data real
      const data = [
        { id: 1, nombre: "4A" },
        { id: 2, nombre: "4B" },
        { id: 3, nombre: "5A" },
        { id: 4, nombre: "5B" }
      ];
      
      setGrupos(data);
      if (data.length > 0) {
        setGrupoSeleccionado(data[0].id);
      }
    } catch (error) {
      console.error("Error al cargar grupos:", error);
    } finally {
      setLoading(false);
    }
  };

  // API: Cargar datos del reporte
  const cargarDatosReporte = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con tu endpoint real
      // const response = await fetch(
      //   `/api/maestro/reportes?grupo_id=${grupoSeleccionado}&rango=${rangoFecha}`,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${token}`
      //     }
      //   }
      // );
      // const data = await response.json();
      
      // Datos de ejemplo - reemplazar con data real
      const data = {
        porcentajeAsistencia: 85,
        porcentajeFaltas: 15,
        tendencia: rangoFecha === "semanal" 
          ? [82, 85, 88, 80, 90]
          : rangoFecha === "mensual"
          ? [85, 87, 83, 88]
          : [84, 86, 85, 87, 86, 88],
        topFaltas: [
          { nombre: "López", faltas: 6 },
          { nombre: "Hernández", faltas: 5 },
          { nombre: "Pérez", faltas: 4 },
          { nombre: "Ramírez", faltas: 4 },
          { nombre: "Díaz", faltas: 3 }
        ],
        totalAlumnos: 32,
        asistenciasPromedio: 27,
        faltasPromedio: 5
      };
      
      setDatosReporte(data);
    } catch (error) {
      console.error("Error al cargar datos del reporte:", error);
    } finally {
      setLoading(false);
    }
  };

  // Configuración mejorada para las gráficas
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
            family: "'Inter', 'Segoe UI', 'Arial', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 47, 108, 0.9)",
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            return context.label + ": " + context.parsed + "%";
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(0, 47, 108, 0.9)",
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            return "Asistencia: " + context.parsed.y + "%";
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + "%";
          },
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(0, 47, 108, 0.9)",
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            return "Faltas: " + context.parsed.y;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  // Preparar datos para las gráficas
  const generalAsistencia = datosReporte ? {
    labels: ["Asistencia", "Faltas"],
    datasets: [
      {
        data: [datosReporte.porcentajeAsistencia, datosReporte.porcentajeFaltas],
        backgroundColor: ["#4CAF50", "#E57373"],
        borderWidth: 0,
        hoverOffset: 10
      },
    ],
  } : null;

  const getTendenciaLabels = () => {
    if (rangoFecha === "semanal") return ["Lun", "Mar", "Mié", "Jue", "Vie"];
    if (rangoFecha === "mensual") return ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];
    return ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  };

  const tendenciaSemanal = datosReporte ? {
    labels: getTendenciaLabels(),
    datasets: [
      {
        label: "% Asistencia",
        data: datosReporte.tendencia,
        borderColor: "#002F6C",
        backgroundColor: "rgba(0, 47, 108, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#FFB81C",
        pointBorderColor: "#002F6C",
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3
      },
    ],
  } : null;

  const topFaltas = datosReporte ? {
    labels: datosReporte.topFaltas.map(alumno => alumno.nombre),
    datasets: [
      {
        label: "Faltas",
        data: datosReporte.topFaltas.map(alumno => alumno.faltas),
        backgroundColor: "#FFB81C",
        borderRadius: 8,
        barThickness: 50
      },
    ],
  } : null;

  if (loading && !datosReporte) {
    return (
      <MainLayout title="Reportes y Gráficas" userName="Profesor García">
        <div className="reportes-container">
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Cargando reportes...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Reportes y Gráficas" userName="Profesor García">
      <div className="reportes-container">
        
        {/* Filtros */}
        <div className="filtros-section">
          <div className="filtro-grupo">
            <label>Seleccionar Grupo:</label>
            <select 
              value={grupoSeleccionado}
              onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="select-filtro"
              disabled={loading}
            >
              {grupos.map(grupo => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-fecha">
            <label>Rango de fechas:</label>
            <select 
              value={rangoFecha}
              onChange={(e) => setRangoFecha(e.target.value)}
              className="select-filtro"
              disabled={loading}
            >
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="semestral">Semestral</option>
            </select>
          </div>
        </div>

        {datosReporte && (
          <>
            {/* Grid de Gráficas */}
            <div className="graficas-grid">
              {/* Gráfica 1 – General */}
              <div className="grafica-card">
                <h3>Porcentaje General de Asistencia</h3>
                <p className="grupo-info">
                  Grupo {grupos.find(g => g.id === parseInt(grupoSeleccionado))?.nombre}
                </p>
                <div className="chart-container-doughnut">
                  <Doughnut data={generalAsistencia} options={doughnutOptions} />
                </div>
                <div className="stats-summary">
                  <span className="stat-presente">
                    ✓ {datosReporte.porcentajeAsistencia}% Asistencia
                  </span>
                  <span className="stat-falta">
                    ✗ {datosReporte.porcentajeFaltas}% Faltas
                  </span>
                </div>
              </div>

              {/* Gráfica 2 – Tendencia */}
              <div className="grafica-card grafica-wide">
                <h3>Tendencia de Asistencia</h3>
                <p className="grupo-info">
                  Grupo {grupos.find(g => g.id === parseInt(grupoSeleccionado))?.nombre} - {rangoFecha}
                </p>
                <div className="chart-container-line">
                  <Line data={tendenciaSemanal} options={lineOptions} />
                </div>
              </div>

              {/* Gráfica 3 – Top faltas */}
              <div className="grafica-card grafica-wide">
                <h3>Top 5 Alumnos con Más Faltas</h3>
                <p className="grupo-info">
                  Grupo {grupos.find(g => g.id === parseInt(grupoSeleccionado))?.nombre}
                </p>
                <div className="chart-container-bar">
                  <Bar data={topFaltas} options={barOptions} />
                </div>
              </div>
            </div>

            {/* Resumen estadístico */}
            <div className="resumen-estadistico">
              <div className="stat-box">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <div className="stat-value">{datosReporte.totalAlumnos}</div>
                  <div className="stat-label">Total Alumnos</div>
                </div>
              </div>
              
              <div className="stat-box">
                <div className="stat-icon">✓</div>
                <div className="stat-content">
                  <div className="stat-value">{datosReporte.asistenciasPromedio}</div>
                  <div className="stat-label">Asistencias Promedio</div>
                </div>
              </div>
              
              <div className="stat-box">
                <div className="stat-icon">⚠️</div>
                <div className="stat-content">
                  <div className="stat-value">{datosReporte.faltasPromedio}</div>
                  <div className="stat-label">Faltas Promedio</div>
                </div>
              </div>
            </div>
          </>
        )}

        {!datosReporte && !loading && (
          <div className="no-data-message">
            Selecciona un grupo para ver los reportes
          </div>
        )}

      </div>
    </MainLayout>
  );
}