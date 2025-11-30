import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { 
      username, 
      password 
    });
    
    // Guarda token y datos d usuario
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error de conexión' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};