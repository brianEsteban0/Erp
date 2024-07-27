import { useNavigate } from 'react-router-dom'; 
import { getProyectos } from '../services/ProyectoService';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const data = await getProyectos();
      if (data) {
        setProyectos(data);
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
      toast.error('Error al cargar los proyectos.');
    }
  };

  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer custom-button";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-1/2 py-4 px-6 text-left text-gray-600 font-bold uppercase">Proyectos</th>
                <th className="w-1/2 py-4 px-6 text-left text-gray-600 font-bold uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="group relative border rounded transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 bg-gray-100">
                    <div className="relative py-12 p-8">
                      <div className="flex flex-col items-center space-y-4">
                        <button 
                          className={buttonStyle}
                          onClick={() => navigate('/proyectos/ver')}
                        >
                          Ver Proyectos
                        </button>
                        <p className="text-gray-600">Accede a una vista detallada de todos los proyectos disponibles. Ppuedes revisar el estado, los plazos y la información de cada proyecto en curso.</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="group relative border rounded transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 bg-gray-100">
                    <div className="relative py-12 p-8">
                      <div className="flex flex-col items-center space-y-4">
                        <button 
                          className={buttonStyle}
                          onClick={() => navigate('/proyectos/agregar')}
                        >
                          Agregar Proyecto
                        </button>
                        <p className="text-gray-600">Crea un nuevo proyecto con la información requerida como el título, la descripción, la empresa licitante, fechas y actividades.</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="group relative border rounded transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 bg-gray-100">
                    <div className="relative py-12 p-8">
                      <div className="flex flex-col items-center space-y-4">
                        <button 
                          className={buttonStyle}
                          onClick={() => navigate('/proyectos/modificar')}
                        >
                          Modificar Proyecto
                        </button>
                        <p className="text-gray-600">Realiza modificaciones a proyectos existentes. Puedes actualizar la información del proyecto, añadir nuevas actividades, cambiar responsables y ajustar plazos según sea necesario.</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="group relative border rounded transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 bg-gray-100">
                    <div className="relative py-12 p-8">
                      <div className="flex flex-col items-center space-y-4">
                        <button 
                          className={buttonStyle}
                          onClick={() => navigate('/proyectos/inventario')}
                        >
                          Asignar Inventario
                        </button>
                        <p className="text-gray-600">Administra y asigna inventarios específicos a cada proyecto. Permite gestionar el material y los recursos necesarios para la ejecución de los proyectos.</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="group relative border rounded transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 bg-gray-100">
                    <div className="relative py-12 p-8">
                      <div className="flex flex-col items-center space-y-4">
                        <button
                          className={buttonStyle}
                          onClick={() => navigate('/asignaciones')}
                        >
                          Gestionar Personal
                        </button>
                        <p className="text-gray-600">Gestiona el personal asignado a los proyectos. Puedes verificar disponibilidad, asignar y liberar colaboradores a proyectos.</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 border-b border-gray-200"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;
