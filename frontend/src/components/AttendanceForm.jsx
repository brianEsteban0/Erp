import React, { useState, useEffect } from 'react';
import attendanceService from '../services/attendance.service';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AttendanceForm = () => {
  const { user } = useAuth();
  const [rut, setRut] = useState('');
  const [lastAttendance, setLastAttendance] = useState({ checkIn: null, checkOut: null, photoUrl: null });
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (user && user.rut) {
      setRut(user.rut);
    }
  }, [user]);

  const handleCheckIn = async () => {
    setIsWaiting(true);
    try {
      const response = await attendanceService.checkIn(rut);
      setLastAttendance((prevState) => ({
        ...prevState,
        checkIn: response.attendance.checkIn,
        photoUrl: response.attendance.photoUrl,
      }));
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
      const response = await attendanceService.checkOut(rut);
      setLastAttendance((prevState) => ({
        ...prevState,
        checkOut: response.attendance.checkOut,
        photoUrl: response.attendance.photoUrl,
      }));
      toast.success('Check-out registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar check-out:', error);
      toast.error('Hubo un error al registrar el check-out');
    } finally {
      setIsWaiting(false);
    }
  };

  const getPhotoUrl = (url) => {
    return url.startsWith('http') ? url : `http://localhost:3000${url}`;
  };

  const formatDateTime = (dateTime) => {
    return dateTime ? format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss') : 'N/A';
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-5 relative border rounded flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Registrar Asistencia</h2>
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
        <div className="mb-4 flex justify-center w-full">
          <button onClick={handleCheckIn} className="bg-blue-500 text-white px-4 py-2 mr-2">Registrar Check-in</button>
          <button onClick={handleCheckOut} className="bg-red-500 text-white px-4 py-2">Registrar Check-out</button>
        </div>
        {isWaiting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-white">Por favor, ingrese su huella digital...</p>
          </div>
        )}
      </div>
      <div className="p-5 border rounded flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Último Registro</h2>
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
      </div>
    </div>
  );
};

export default AttendanceForm;
