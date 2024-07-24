import { useState, useEffect } from 'react';
import { addCantidadToInventarioProyecto, getInventarioProyectoById } from './../../services/inventarioProyecto.service.js';
import { getInventario, restarInventario} from '../../services/inventario.service.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const MaddIP = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inventarioMH, setinventario] = useState([]);
    const [inventarioProyecto, setInventarioProyecto] = useState({
        inventario: '',
        cantidadAsignada: 0,
    });
    const [selectedItem, setSelectedItem] = useState(null);
    const [inventarioActual, setInventarioActual] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventarioResponse = await getInventario();
                const inventarioData = inventarioResponse.data;
                setinventario(inventarioData);

                const proyectoResponse = await getInventarioProyectoById(id);
                const proyectoData = proyectoResponse.data;
                setInventarioActual(proyectoData);

                filterInventory(inventarioData, proyectoData.inventarios);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const filterInventory = (allInventory, projectInventory) => {
            const filtered = allInventory.filter(inventoryItem => {
                return !projectInventory.some(projectInventoryItem => projectInventoryItem.inventario._id === inventoryItem._id);
            });
        setFilteredInventory(filtered);
    };

    const handleChange = (e) => {
        setInventarioProyecto({
            ...inventarioProyecto,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "inventario") {
            const selectedItem = inventarioMH.find(item => item._id === e.target.value);
            setSelectedItem(selectedItem);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCantidadToInventarioProyecto(id, inventarioProyecto);
            const { inventario, cantidadAsignada } = inventarioProyecto;
            const body = { inventario: inventario, cantidad: cantidadAsignada };
            await restarInventario(inventario,body);
            navigate(`/proyectos/inventario/ver/${id}`);
        } catch (error) {
            console.error('Error adding inventory:', error);
        }
    };

const ItemSelected = ({ item }) => {
    return (
        <div className='mb-2 mt-2'>
            {item && (
                <div className="flex justify-between border-b border-gray-300 text-gray-700">
                    <table className="">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-6 text-left text-gray-600 font-bold">Descripcion</th>
                                <th className="py-2 px-6 text-left text-gray-600 font-bold">Cantidad</th>
                                <th className="py-2 px-6 text-left text-gray-600 font-bold">Unidad de Medida</th>
                                <th className="py-2 px-6 text-left text-gray-600 font-bold">Tipo</th>
                                <th className="py-2 px-6 text-left text-gray-600 font-bold">Almacen</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                                <tr>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.material.descripcion}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.cantidad}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.material.unidad}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.material.tipo}</td>
                                        <td className="py-4 px-6 border-b border-gray-200">{item.almacen.nombre}</td>
                                </tr>

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
    };
    
    return (
        <div>
            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Agregar Material a Proyecto</h2>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="w-1/2">
                    <div className="mb-4">
                        <label htmlFor="inventario" className="block text-gray-700 text-sm font-bold mb-2">Material</label>
                        <select
                            name="inventario"
                            id="inventario"
                            onChange={handleChange}
                            value={inventarioProyecto.inventario}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccione un material</option>
                            {filteredInventory?.map((item) => (
                                <option key={item._id} value={item._id} onSelect={() => ItemSelected(item)}>{item.material.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <ItemSelected item={selectedItem} />
                    <div className="mb-4">
                        <label htmlFor="cantidadAsignada" className="block text-gray-700 border-gray-300 text-sm font-bold mb-2">Cantidad</label>
                        <input
                            type="number"
                            name="cantidadAsignada"
                            id="cantidadAsignada"
                            min={1}
                            max={selectedItem?.cantidad}
                            onChange={handleChange}
                            value={inventarioProyecto.cantidadAsignada}
                            className="w-full border border-gray-300 rounded bg-gray-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default MaddIP;