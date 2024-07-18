import { useState, useEffect } from 'react';
import { getInventarioProyecto } from '../../services/inventarioProyecto.service';
import { useNavigate } from 'react-router-dom';


const InventarioProyecto = () => {
    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchInventoryData();
    }, []);



    const fetchInventoryData = async () => {
        try {

            const response = await getInventarioProyecto();
            const data = response.data;
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    const redireccionar = (ruta) => {
        navigate(ruta);
    };



    return (
        <div className='text-gray-700'>
            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Inventario de Proyecto</h2>
            </div>
            <div className='flex justify-between mb-3 text-xl'>
                <div></div>
                <div><button onClick={() => redireccionar("/proyectos/inventario/registrar")}>Asignar materiales</button></div>
            </div>
            <div>
                <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nombre Proyecto</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Acciones</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {inventory && inventory.length > 0 ? (
                                inventory.map((item) => (
                                <tr key={item._id}>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.proyecto.titulo}</td>                                        
                                    <td className="px-6 border-b border-gray-200">
                                            <button onClick={() => navigate(`/proyectos/inventario/ver/${item._id}`)} className="bg-orange-500 mr-3 text-white py-1 px-2 rounded-full text-xs">Ver</button>
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
            </div>
        </div>
    );
};

export default InventarioProyecto;