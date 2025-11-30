import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { isRequired } from '../../utils/validators';
import './Login.css';
import logoUteq from '../../assets/images/logoUTEQcolor.png';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isRequired(formData.username)) {
      setError('El correo es requerido');
      return;
    }

    if (!isRequired(formData.password)) {
      setError('La contraseña es requerida');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Simular login exitoso
      console.log('Login simulado con:', formData);
      
      // Guardar usuario simulado en localStorage
      const fakeUser = {
        id: 1,
        username: formData.username,
        nombre: 'Yanny',
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(fakeUser));
      
    navigate("/maestro/dashboard");


      
      setLoading(false);
    }, 1000); // Simula 1 segundo de espera

  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo">
            <img src={logoUteq} alt="Logo UTEQ"/>
          </div>

        </div>
        <h1 className="login-title">Bienvenido al Sistema de Asistencia UTEQ</h1>
        <h2 className="login-subtitle">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
     
          <div className="form-group">
            <label htmlFor="username">Correo:</label>
            <Input
              type="text"
              name="username"
              placeholder="Ingresa tu correo"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <Input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          <div className="login-footer">
            <a href="/recuperar-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}