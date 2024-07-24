import { useState, useEffect } from 'react';
import { getInventario } from '../../services/inventario.service';
import { useNavigate } from 'react-router-dom';
import ModalAddCantidad from './ModalAddCantidad';

const Inventario = () => {
    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const openModal = (id) => {
        setModalIsOpen(true);
        setId(id);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        fetchInventoryData();
    };

    const fetchInventoryData = async () => {
        try {
            // Make API request to fetch inventory data
            const response = await getInventario();
            const data = response.data;

            // Update the inventory state with fetched data
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    const redireccionar = (ruta) => {
        navigate(ruta);
    };

    const formatearFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }


    return (
        <div className='text-gray-700'>
            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Manejo de Inventario</h2>
            </div>
            <div className='flex justify-between mb-3 text-xl'>
                <div><button onClick={() => redireccionar("/inventario/almacen")}>Almacen</button></div>
                <div><button onClick={() => redireccionar("/inventario/material")}>Materiales y Herramientas</button></div>
                <div><button onClick={() => redireccionar("/inventario/registrar")}>Registrar Inventario</button></div>
            </div>
            <div>
                <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                    <table class="w-full table-fixed">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nombre</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Descripcion</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Cantidad</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Unidad de Medida</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Almacen</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Ingresado Por</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Fecha Ingreso</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {inventory && inventory.length > 0 ? (
                                inventory.map((item) => (
                                <tr key={item._id}>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.material.nombre}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.material.descripcion}</td>
                                        <td class="py-4 px-6 border-b border-gray-200 truncate">{item.cantidad}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.material.unidad}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.almacen.nombre}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.usuarioIngreso}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{formatearFecha(item.fechaIngreso)}</td>
                                        
                                    <td class="px-6 border-b border-gray-200">
                                            <button onClick={() => navigate(`/inventario/editar/${item._id}`)} className="bg-gray-600 py-1 px-2 rounded-md">
                                                <img className='w-5 h-5' src="http://localhost:3000/uploads/editar.png" alt="" />
                                            </button>
                                            <button onClick={() => openModal(item._id)} className='bg-gray-600 py-1 px-2 rounded-md ml-2'>
                                                <img className='w-5 h-5' src="http://localhost:3000/uploads/addrows2.png" alt="" />
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
                <ModalAddCantidad isOpen={modalIsOpen} onClose={closeModal} id={id} />
            </div>
        </div>
    );
};

export default Inventario;