import { useEffect, useState } from "react";
import { getMaterial } from "../../services/material.service";
import ModalAddMaterial from "./ModalAddMaterial";
import { useNavigate } from 'react-router-dom';

const Material = () => {
    const navigate = useNavigate();
    const [material, setMaterial] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchMaterialData();
    }, []);

    const fetchMaterialData = async () => {
        try {
            const response = await getMaterial();
            const data = response.data;
            setMaterial(data);
        } catch (error) {
            console.error('Error fetching material data:', error);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        fetchMaterialData();
    };

    return (
        <div className='text-gray-700 '>

            <div className="text-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Herramientas y Materiales</h2>
            </div>
            <div className="p-2 justify-between flex">
                <div></div>
                <button onClick={openModal} className=' py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-500 flex'
                >Registar Material</button>
            </div>
            
            <ModalAddMaterial isOpen={modalIsOpen} onClose={closeModal} />
            <div>
                <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                    <table class="w-full table-fixed">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nombre</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Descripcion</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Tipo</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Unidad de Medida</th>
                                <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            {material && material.length > 0 ? (
                                material.map((item) => (
                                <tr key={item.id}>
                                    <td class="py-4 px-6 border-b border-gray-200">{item.nombre}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{ item.descripcion}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.tipo}</td>
                                        <td class="py-4 px-6 border-b border-gray-200">{item.unidad}</td>
                                    <td class="py-4 px-6 border-b border-gray-200">

                                        <button onClick={() => navigate(`/inventario/material/editar/${item._id}`)} className="bg-gray-600 py-1 px-2 rounded-md">
                                            <img className='w-5 h-5' src="http://localhost:3000/uploads/editar.png" alt="" />
                                        </button>
                                </td>
                                </tr>
                                ))
                            ) : (
                                <p>No hay Materiales o herramientas registradas.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Material;