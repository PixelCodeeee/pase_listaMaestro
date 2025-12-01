import api from './api';

// get simulado
export const getAllProgramas = async () => {
  try {
    const response = await api.get('/programas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener programas:', error);
    throw error;
  }
};

// GET simulado
export const getProgramaById = async (id) => {
  try {
    const response = await api.get(`/programas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener programa:', error);
    throw error;
  }
};

// POST simulado
export const createPrograma = async (data) => {
  try {
    const response = await api.post('/programas', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear programa:', error);
    throw error;
  }
};

// PUT simulado
export const updatePrograma = async (id, data) => {
  try {
    const response = await api.put(`/programas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar programa:', error);
    throw error;
  }
};

// DELETE simulado
export const deletePrograma = async (id) => {
  try {
    const response = await api.delete(`/programas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar programa:', error);
    throw error;
  }
};

// DELETE simulado
export const deleteMultipleProgramas = async (ids) => {
  try {
    const response = await api.post('/programas/delete-multiple', { ids });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar programas:', error);
    throw error;
  }
};