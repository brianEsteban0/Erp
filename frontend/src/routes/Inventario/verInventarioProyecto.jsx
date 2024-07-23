import { useState, useEffect } from 'react';
import { getInventarioProyectoById, deleteIndexInventarioProyecto } from './../../services/inventarioProyecto.service';
import { sumarInventario } from '../../services/inventario.service';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MaddIP from './MaddIP.jsx';

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

    const deleteInventarioRow = async (item) => {
        try {
            const { cantidadAsignada, inventario, _id } = item;
            const index = { cantidad: cantidadAsignada};
            await deleteIndexInventarioProyecto(id, { _id});
            await sumarInventario(inventario._id, index);
            fetchInventarioData(id);
        } catch (error) {
            console.error('Error deleting inventory row:', error);
        }
    };


    return (
        <div className='text-gray-700'>
            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Inventario de {inventarioMH.proyecto?.titulo}</h2>
            </div>
            <div className='flex justify-between mb-3 text-xl'>
                <div></div>
                <div>
                    <button onClick={() => console.log('locura maxima pq no funciona el modal')}
                            className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-500'
                    >Agregar Materiales</button>

                </div>
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
                                            <button onClick={() => deleteInventarioRow(item)} className='bg-gray-600 py-1 px-2 rounded-md'>
                                                <img className='w-5 h-5' src="http://localhost:3000/uploads/eliminar.png" alt="" />
                                            </button>
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