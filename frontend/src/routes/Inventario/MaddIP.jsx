import { useState, useEffect } from 'react';
import { addCantidadToInventarioProyecto } from './../../services/inventarioProyecto.service.js';
import { getInventario} from '../../services/inventario.service.js';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


const MaddIP = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [inventarioMH, setinventario] = useState([]);
    const [inventarioProyecto, setInventarioProyecto] = useState({
        inventario: '',
        cantidadAsignada: 0,
    });



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar inventarioProyecto de Material/Herramienta"
        >
                
                <div className=''>
                    <h1 className="text-2xl text-center font-bold text-blue-900 ">Agregar Material o Herramienta</h1>
            </div>
            
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 py-2 px-4 rounded-md"
                >
                    Cancelar
                </button>
            
        </Modal>
    );
};

export default MaddIP;