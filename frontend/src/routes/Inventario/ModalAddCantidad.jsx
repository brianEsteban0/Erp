import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { sumarInventario, getInventarioById } from '../../services/inventario.service';
import { toast } from 'react-toastify';


const ModalAddCantidad = ({ isOpen, onClose , id}) => {
    const [material, setMaterial] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        unidad: '',
        almacen: '',
        cantidad: 0,
    });
    const [cantidad, setCantidad] = useState({
        cantidad: 0,
    });

    useEffect(() => {
        if (isOpen) { fetchInventarioData(); }
    }, [id]);

    const fetchInventarioData = async () => {
        try {
            const response = await getInventarioById(id);
            const data = response.data;
            setMaterial({
                nombre: data.material.nombre,
                descripcion: data.material.descripcion,
                tipo: data.material.tipo,
                unidad: data.material.unidad,
                almacen: data.almacen.nombre,
                cantidad: data.cantidad,
            });
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCantidad({ [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sumarInventario(id, cantidad);
            toast.success('Material/Herramienta creado con éxito');
            onClose();
            setCantidad({
                cantidad: 0,
            });
        } catch (error) {
            console.error('Error al sumar Material/Herramienta:', error);
            toast.error('Error al sumar Material/Herramienta');
        }
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Cantidad de Material/Herramienta"
            className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-md p-5 w-1/3'}
        >
            <div className="flex justify-between items-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Agregar Cantidad</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id='nombre'
                        name='nombre'
                        value={material.nombre}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md shadow-sm "
                        autoComplete='off'
                        disabled 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripcion</label>
                    <input
                        type="text"
                        id='descripcion'
                        name='descripcion'
                        value={material.descripcion}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                        autoComplete='off'
                        disabled
                    />
                </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            type="text"
                            id='tipo'
                            name='tipo'
                            value={material.tipo}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                            disabled
                        >
                            <option value="">Seleccionar tipo de material</option>
                            <option value="material">Material</option>
                            <option value="herramienta">Herramienta</option>
                        </select>
                    </div>
                <div className='flex gap-4'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad Actual</label>
                        <input
                            type="number"
                            id='cantidad'
                            name='cantidad'
                            value={material.cantidad}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
                        <select
                            id='unidad'
                            name='unidad'
                            value={material.unidad}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                            disabled
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
                        <label className="block text-sm font-medium text-gray-700">Cantidad a Agregar</label>
                        <input
                            type="number"
                            id='cantidad'
                            name='cantidad'
                            value={cantidad.cantidad}
                        onChange={(e) => handleInputChange(e)}
                        min={1}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                        />
                    </div>
                <div>
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                    >
                        Agregar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-500 py-2 px-4 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>


            </form>
            
        </Modal>
    );
};

export default ModalAddCantidad;