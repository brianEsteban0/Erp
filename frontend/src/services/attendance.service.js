import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/asistencia`;

const checkIn = async (rut, isAdminOverride = false) => {
  const response = await axios.post(`${API_URL}/checkin`, { rut, isAdminOverride });
  return response.data;
};

const checkOut = async (rut, isAdminOverride = false) => {
  const response = await axios.post(`${API_URL}/checkout`, { rut, isAdminOverride });
  return response.data;
};

const getLastAttendance = async (rut) => {
  const response = await axios.get(`${API_URL}/last`, { params: { rut } });
  return response.data;
};

const getAttendanceRecords = async (rut, startDate, endDate) => {
  const response = await axios.get(`${API_URL}/records`, { params: { rut, startDate, endDate } });
  return response.data;
};

const getWorkHours = async (rut, startDate, endDate) => {
  const response = await axios.get(`${API_URL}/workhours`, { params: { rut, startDate, endDate } });
  return response.data;
};

const attendanceService = {
  checkIn,
  checkOut,
  getLastAttendance,
  getAttendanceRecords,
  getWorkHours,
};

export default attendanceService;
