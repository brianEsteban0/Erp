import { useState } from 'react';
import Modal from 'react-modal';
import { createMaterial } from '../../services/material.service';

const ModalAddMaterial = ({ isOpen, onClose}) => {
    const [material, setMaterial] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        unidad: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMaterial({ ...material, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMaterial = {
                nombre: material.nombre,
                descripcion: material.descripcion,
                tipo: material.tipo,
                unidad: material.unidad,
            };
            await createMaterial(newMaterial);
            alert('Material/Herramienta creado con éxito');
            onClose();
            setMaterial({
                nombre: '',
                descripcion: '',
                tipo: '',
                unidad: '',
            });
        } catch (error) {
            console.error('Error al crear Material/Herramienta:', error);
        }
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="formulario de Material/Herramienta"
        >
            <div className="flex justify-between items-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Registrar Nueva Herramienta o Material</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id='nombre'
                        name='nombre'
                        value={material.nombre}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
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
                            <option value="otro">Metro cubico</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    >
                        Registrar
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 py-2 px-4 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>


            </form>
            
        </Modal>
    );
};

export default ModalAddMaterial;