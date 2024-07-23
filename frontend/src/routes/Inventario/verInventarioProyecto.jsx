import { useState, useEffect } from 'react';
import { getInventarioProyectoById } from './../../services/inventarioProyecto.service';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const VerInventarioProyecto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inventarioMH, setinventario] = useState([]);

    useEffect(() => {
        fetchInventarioData(id);
    }, []);

    const fetchInventarioData = async (id) => {
        try {
            const response = await getInventarioProyectoById(id);
            const data = response.data;
            console.log(data);
            setinventario(data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };


    return (
        <div className='text-gray-700'>
            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Inventario de {inventarioMH.proyecto?.titulo}</h2>
            </div>

            <div>
                <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nombre</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Descripcion</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Cantidad</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Unidad de Medida</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Tipo</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Almacen</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Acciones</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {inventarioMH.inventarios && inventarioMH.inventarios.length > 0 ? (
                                inventarioMH.inventarios.map((item) => (
                                <tr key={item._id}>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.inventario.material.nombre}</td>
                                        <td className="py-4 border-b border-gray-200">{item.inventario.material.descripcion}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.cantidadAsignada}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.inventario.material.unidad}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.inventario.material.tipo}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.inventario.almacen.nombre}</td>
                                        
                                    <td className="px-6 border-b border-gray-200">
                                            <button onClick={() => navigate(`/inventario/editar/${item._id}`)} className="bg-orange-500 text-white py-1 px-2 rounded-full text-xs">Editar</button>
                                            <button onClick={() => openModal(item._id)} className='bg-green-500 text-white py-1 px-2 rounded-full text-xs'>Agregar</button>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                    <tr>
                                        <td>
                                            No existe registro de inventarios asignado a proyectos.
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='p-4'>
                    <button
                        onClick={() => navigate('/proyectos/inventario')}
                        className="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Volver
                    </button>

                </div>

            </div>
        </div>
    );
};

export default VerInventarioProyecto;