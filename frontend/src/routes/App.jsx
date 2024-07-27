import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Bienvenido al Sistema de Planificación de Recursos Empresariales (ERP)</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Presentación del Software</h2>
        <p className="text-gray-600 mb-4">
          Nuestro sistema ERP está diseñado para mejorar la organización y gestión de los recursos de su empresa constructora, proporcionando una solución para la planificación de proyectos, gestión de personal y comunicación interna.
        </p>
        <p className="text-gray-600">
          Con nuestro software, podrá llevar un control detallado de sus proyectos, asignar tareas a su personal y mantener una comunicación fluida entre los diferentes departamentos de su empresa. Todo ello con una interfaz sencilla e intuitiva que facilitará la adopción de la herramienta por parte de sus empleados.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Características Principales</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Gestión de Proyectos: Planificación, seguimiento y finalización de proyectos.</li>
          <li>Recursos Humanos: Gestión de asistencia y asignaciones de personal.</li>
          <li>Comunicación Interna: Facilita la comunicación y coordinación interna.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
