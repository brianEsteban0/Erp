import React, { useState, useEffect } from 'react';
import attendanceService from '../services/attendance.service';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../public/styles.css';

const AttendanceForm = () => {
  const { user } = useAuth();
  const [rut, setRut] = useState('');
  const [lastAttendance, setLastAttendance] = useState({ checkIn: null, checkOut: null, photoUrl: null });
  const [isWaiting, setIsWaiting] = useState(false);
  const [overrideAdmin, setOverrideAdmin] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchRut, setSearchRut] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workHours, setWorkHours] = useState(null);
  const [workUserInfo, setWorkUserInfo] = useState({});

  useEffect(() => {
    if (user && user.rut) {
      setRut(user.rut);
      fetchLastAttendance(user.rut);
      setDefaultDates();
    }
  }, [user]);

  const setDefaultDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const fetchLastAttendance = async (rut) => {
    try {
      const response = await attendanceService.getLastAttendance(rut);
      setLastAttendance(response.attendance);
    } catch (error) {
      console.error('Error al obtener el último registro de asistencia:', error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await attendanceService.getAttendanceRecords(searchRut, startDate, endDate);
      setAttendanceRecords(response.records);
    } catch (error) {
      console.error('Error al obtener registros de asistencia:', error);
      toast.error('Hubo un error al obtener los registros de asistencia');
    }
  };

  const fetchWorkHours = async () => {
    try {
      const response = await attendanceService.getAttendanceRecords(searchRut, startDate, endDate);
      const totalHours = response.records.reduce((total, record) => {
        const checkIn = new Date(record.checkIn);
        const checkOut = new Date(record.checkOut);
        const hours = (checkOut - checkIn) / 1000 / 3600;
        return total + hours;
      }, 0);
      setWorkHours(totalHours.toFixed(2));
      setWorkUserInfo(response.user);
    } catch (error) {
      console.error('Error al calcular las horas trabajadas:', error);
      toast.error('Hubo un error al calcular las horas trabajadas');
    }
  };

  const handleCheckIn = async () => {
    setIsWaiting(true);
    try {
      const response = await attendanceService.checkIn(rut, overrideAdmin);
      setLastAttendance(response.attendance);
      toast.success('Check-in registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar check-in:', error);
      toast.error('Hubo un error al registrar el check-in');
    } finally {
      setIsWaiting(false);
    }
  };

  const handleCheckOut = async () => {
    setIsWaiting(true);
    try {
      const response = await attendanceService.checkOut(rut, overrideAdmin);
      setLastAttendance(response.attendance);
      toast.success('Check-out registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar check-out:', error);
      toast.error('Hubo un error al registrar el check-out');
    } finally {
      setIsWaiting(false);
    }
  };

  const getPhotoUrl = (url) => {
    return url.startsWith('http') ? url : `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  const formatDateTime = (dateTime) => {
    return dateTime ? format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss') : 'N/A';
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const { rut, username, email, photoUrl } = workUserInfo;

      doc.addImage(getPhotoUrl(photoUrl), 'JPEG', 10, 10, 30, 30);
      doc.setFontSize(12);
      doc.text(`RUT: ${rut}`, 10, 50);
      doc.text(`Nombre: ${username}`, 10, 60);
      doc.text(`Email: ${email}`, 10, 70);
      doc.text(`Horas Trabajadas: ${workHours} horas`, 10, 80);

      doc.setFontSize(14);
      doc.text('Registros de Asistencia:', 10, 100);

      const tableColumn = ['Fecha', 'Check-in', 'Check-out'];
      const tableRows = [];

      attendanceRecords.forEach(record => {
        const recordData = [
          formatDateTime(record.date),
          formatDateTime(record.checkIn),
          formatDateTime(record.checkOut)
        ];
        tableRows.push(recordData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'grid'
      });

      doc.save('informe_asistencia.pdf');
      toast.success('Informe PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar el informe PDF:', error);
      toast.error('Hubo un error al generar el informe PDF');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Registrar Asistencia</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                <div className="w-full">
                  <label className="block mb-2 text-black">RUT del Empleado:</label>
                  <input
                    type="text"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    required
                    className="p-2 mb-4 text-black border border-gray-300 rounded w-full"
                  />
                </div>
                {user.roles.some(role => role.name === 'admin') && (
                  <div className="mb-4 flex items-center">
                    <label className="mr-2 text-black">Registro manual:</label>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={overrideAdmin} 
                        onChange={() => setOverrideAdmin(!overrideAdmin)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                )}
                <div className="mb-4 flex justify-center w-full">
                  <button onClick={handleCheckIn} className="custom-button bg-blue-500 text-white px-4 py-2 mr-2">Registrar Check-in</button>
                  <button onClick={handleCheckOut} className="custom-button bg-red-500 text-white px-4 py-2">Registrar Check-out</button>
                </div>
                {isWaiting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-white">Por favor, ingrese su huella digital...</p>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Último Registro</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                <div className="bg-white p-4 rounded shadow-md text-black text-center w-full">
                  {lastAttendance.photoUrl && (
                    <div className="mb-4">
                      <img src={getPhotoUrl(lastAttendance.photoUrl)} alt="Foto del usuario" className="w-24 h-24 rounded-full mx-auto" />
                    </div>
                  )}
                  <p><strong>RUT:</strong> {rut}</p>
                  <p><strong>Check-in:</strong> {formatDateTime(lastAttendance.checkIn)}</p>
                  <p><strong>Check-out:</strong> {formatDateTime(lastAttendance.checkOut)}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {user.roles.some(role => role.name === 'admin') && (
        <>
          <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 col-span-1">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Registros de Asistencia</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <div className="w-full mb-4">
                      <label className="block mb-2 text-black">Buscar por RUT:</label>
                      <input
                        type="text"
                        value={searchRut}
                        onChange={(e) => setSearchRut(e.target.value)}
                        className="p-2 mb-4 text-black border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <label className="block mb-2 text-black">Fecha de Inicio:</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 mb-4 text-black border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <label className="block mb-2 text-black">Fecha de Fin:</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-2 mb-4 text-black border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="flex justify-center w-full">
                      <button onClick={fetchAttendanceRecords} className="custom-button bg-green-500 text-white px-4 py-2 mb-4 mr-2">Buscar Registros</button>
                      <button onClick={fetchWorkHours} className="custom-button bg-blue-500 text-white px-4 py-2 mb-4">Horas Trabajadas</button>
                    </div>
                    <div className="w-full overflow-y-auto h-64">
                      {attendanceRecords.length > 0 ? (
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr>
                              <th className="py-2 text-black">Fecha</th>
                              <th className="py-2 text-black">Check-in</th>
                              <th className="py-2 text-black">Check-out</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attendanceRecords.map((record) => (
                              <tr key={record._id}>
                                <td className="py-2 text-black">{formatDateTime(record.date)}</td>
                                <td className="py-2 text-black">{formatDateTime(record.checkIn)}</td>
                                <td className="py-2 text-black">{formatDateTime(record.checkOut)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-black">No se encontraron registros</p>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 col-span-1">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Horas Trabajadas</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {workUserInfo && workUserInfo.photoUrl && (
                      <div className="mb-4">
                        <img src={getPhotoUrl(workUserInfo.photoUrl)} alt="Foto del usuario" className="w-24 h-24 rounded-full mx-auto" />
                      </div>
                    )}
                    <div className="bg-white p-4 rounded shadow-md text-black text-center w-full">
                      <p><strong>RUT:</strong> {workUserInfo.rut}</p>
                      <p><strong>Nombre:</strong> {workUserInfo.username}</p>
                      <p><strong>Email:</strong> {workUserInfo.email}</p>
                      <p><strong>Horas Trabajadas:</strong> {workHours ? `${workHours} horas` : 'N/A'}</p>
                    </div>
                    <button onClick={generatePDF} className="custom-button bg-blue-500 text-white px-4 py-2 mt-4">Generar Informe</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceForm;
