import axios from './root.service';
import cookies from 'js-cookie';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/users`;

const getAuthHeader = () => {
  const token = cookies.get('jwt-auth');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error loading users:', error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (userId, user) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, user, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const uploadUserPhoto = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/uploadPhoto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeader(),
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};
