import axios from 'axios';

const API_URL = 'http://localhost:3000/api/asistencia';

const checkIn = async (rut) => {
  const response = await axios.post(`${API_URL}/checkin`, { rut });
  return response.data;
};

const checkOut = async (rut) => {
  const response = await axios.post(`${API_URL}/checkout`, { rut });
  return response.data;
};

const attendanceService = {
  checkIn,
  checkOut,
};

export default attendanceService;
