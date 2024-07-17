import { useState } from 'react';
import Modal from 'react-modal';
import { createAlmacen } from '../../services/almace.service';

const ModalAlmacen = ({ isOpen, onClose}) => {
    const [almacen, setAlmacen] = useState({
        nombre: '',
        ubicacion: '',
        fono: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAlmacen({ ...almacen, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAlmacen = {
                nombre: almacen.nombre,
                ubicacion: almacen.ubicacion,
                fono: almacen.fono,
            };
            await createAlmacen(newAlmacen);
            alert('Almacen creado con éxito');
            onClose();
            setAlmacen({
                nombre: '',
                ubicacion: '',
                fono: '',
            });
        } catch (error) {
            console.error('Error al crear almacen:', error);
        }
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Subir Archivo"
        >
            <div className="flex justify-between items-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Registrar Nuevo Almacen</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id='nombre'
                        name='nombre'
                        value={almacen.nombre}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Direccion</label>
                    <input
                        type="text"
                        id='ubicacion'
                        name='ubicacion'
                        value={almacen.ubicacion}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefono</label>
                    <input
                        type="number"
                        id='fono'
                        name='fono'
                        value={almacen.fono}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                    />
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

export default ModalAlmacen;