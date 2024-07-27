import { useState, useEffect } from 'react';
import { getMaterialById, updateMaterial } from './../../services/material.service.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditarMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        unidad: '',
    });
    
    const handleUpdate = (e) => {
        const shouldUpdate = window.confirm('¿Estás seguro de que deseas editar?');

        if (shouldUpdate) {
            handleSubmit(e);
        }
    };

    useEffect(() => {
        if (id) {
            obtenerMaterialSeleccionado(id);
        }
    }, []);


    const obtenerMaterialSeleccionado = async (materialId) => {
        try {
            const response = await getMaterialById(materialId);
            const newI = {
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
                tipo: response.data.tipo,
                unidad: response.data.unidad,
            };
            setMaterial(newI);
        } catch (error) {
            console.error('Error al obtener los detalles del material', error);
            toast.error('Hubo un error al obtener los detalles del material');
            navigate('/inventario/material');
        }
    };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

            await updateMaterial(id,material);
            toast.success('Material modificado exitosamente');
            navigate('/inventario/material');
            setMaterial({
                nombre: '',
                descripcion: '',
                tipo: '',
                unidad: '',
            });
        } catch (error) {
            console.error('Error al modificar el almacen:', error);
            toast.error('Error:', error.response.data.message);
        }
    };

    return (
        <div>
            <div className="">
            <div className="flex justify-between items-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Editar Herramienta o Material</h2>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id='nombre'
                        name='nombre'
                        value={material.nombre}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                        autoComplete='off'
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripcion</label>
                    <input
                        type="text"
                        id='descripcion'
                        name='descripcion'
                        value={material.descripcion}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                        autoComplete='off'
                    />
                </div>
                <div className='flex gap-4'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            type="text"
                            id='tipo'
                            name='tipo'
                            value={material.tipo}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                        >
                            <option value="">Seleccionar tipo de material</option>
                            <option value="material">Material</option>
                            <option value="herramienta">Herramienta</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
                        <select
                            id='unidad'
                            name='unidad'
                            value={material.unidad}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                        >
                            <option value="">Seleccionar unidad de medida</option>
                            <option value="bolsa">Bolsa</option>
                            <option value="unidad">Unidad</option>
                            <option value="kg">Kilogramo</option>
                            <option value="litro">Litro</option>
                            <option value="caja">Caja</option>
                            <option value="metro">Metro</option>
                            <option value="rollo">Rollo</option>
                            <option value="galon">Galon</option>
                            <option value="pieza">Pieza</option>
                            <option value="docena">Docena</option>
                            <option value="paquete">Paquete</option>
                            <option value="saco">Saco</option>
                            <option value="barril">Barril</option>
                            <option value="tonelada">Tonelada</option>
                            <option value="Metro Cubico">Metro cubico</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                    >
                        Registrar
                    </button>
                    <button
                        onClick={() => navigate('/inventario/material')}
                        className="bg-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>


            </form>             
            </div>
        </div>
    );
};

export default EditarMaterial;