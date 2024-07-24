import { useEffect, useState } from "react";
import { getAlmacen } from "../../services/almace.service";
import ModalAlmacen from "./ModalAlmacen";
import { useNavigate } from "react-router-dom";

const Almacen = () => {
    const navigate = useNavigate();
    const [almacen, setAlmacen] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        fetchAlmacenData();
    }, []);

    const fetchAlmacenData = async () => {
        try {
            const response = await getAlmacen();
            const data = response.data;
            setAlmacen(data);
        } catch (error) {
            console.error('Error fetching almacen data:', error);
        }
    };



    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        fetchAlmacenData();
    };

    return (
        <div className='text-gray-700'>
            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Almacenes Registrados</h2>
            </div>
            <div className="p-2 justify-between flex">
                <div></div>
                <button onClick={openModal} className=' py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-500 flex'
                >Agregar Almacen</button>
            </div>
            <ModalAlmacen isOpen={modalIsOpen} onClose={closeModal} />
            <div>
                <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                    <table class="w-full table-fixed">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nombre</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Ubicacion</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Fono</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            {almacen && almacen.length > 0 ? (
                                almacen.map((item) => (
                                <tr key={item.id}>
                                    <td class="py-4 px-6 border-b border-gray-200">{item.nombre}</td>
                                        <td class="py-4 px-6 border-b border-gray-200 truncate">{ item.ubicacion}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{ item.fono}</td>
                                    <td class="py-4 px-6 border-b border-gray-200">
                                        <button onClick={() => navigate(`/inventario/almacen/editar/${item._id}`)} class="bg-gray-500 py-1 px-2 rounded-md">
                                                <img className='w-5 h-5' src="http://localhost:3000/uploads/editar.png" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <p>No existe Almacen. Registre un Almacen para el Inventario.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default Almacen;