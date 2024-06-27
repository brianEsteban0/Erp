import React, { useState } from 'react';
import attendanceService from '../services/attendance.service';

const AttendanceForm = () => {
  const [rut, setRut] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);

  const handleCheckIn = async () => {
    try {
      const response = await attendanceService.checkIn(rut);
      setAttendanceData(response.attendance);
      alert('Check-in registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar check-in:', error);
      alert('Hubo un error al registrar el check-in');
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await attendanceService.checkOut(rut);
      setAttendanceData(response.attendance);
      alert('Check-out registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar check-out:', error);
      alert('Hubo un error al registrar el check-out');
    }
  };

  const getPhotoUrl = (url) => {
    return url.startsWith('http') ? url : `http://localhost:3000${url}`;
  };

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <div>
        <label>RUT del Empleado:</label>
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
          style={{ marginLeft: '10px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleCheckIn} style={{ marginRight: '10px' }}>Registrar Check-in</button>
        <button onClick={handleCheckOut}>Registrar Check-out</button>
      </div>
      {attendanceData && (
        <div style={{ marginTop: '20px', color: 'orange' }}>
          <h3>Datos del Registro:</h3>
          <p><strong>RUT:</strong> {rut}</p>
          <p><strong>Check-in:</strong> {attendanceData.checkIn}</p>
          <p><strong>Check-out:</strong> {attendanceData.checkOut}</p>
          {attendanceData.photoUrl && (
            <div>
              <h3>Foto del Usuario:</h3>
              <img src={getPhotoUrl(attendanceData.photoUrl)} alt="Foto del usuario" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceForm;
