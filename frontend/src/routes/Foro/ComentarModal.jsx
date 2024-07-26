import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from 'react-modal';
import { comentar } from '../../services/foro.service';
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%', // Ancho máximo del modal
        width: '400px', // Ancho específico del modal
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        backgroundColor: 'white'
    }
};

const ComentarModal = ({ isOpen, onClose, id }) => {
    const { user } = useAuth();
    const [comentario, setComentar] = useState({
        usuario: user.email,
        contenido: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComentar({ [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newComentario = {
                usuario: user.email,
                contenido: comentario.contenido,
            };
            await comentar(id, newComentario);
            toast.success('Publicacion comentada con éxito');
            onClose();
            setComentar({
                usuario: '',
                contenido: '',
            });
        } catch (error) {
            console.error('Error al comentar Publicacion:', error);
            toast.error('Error al Comentar Publicacion');
        }
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Comentar Publicacion"
            style={customStyles}
        >
            <div className="flex justify-between items-center mb-4 text-gray-800">
                <h2 className="text-lg font-bold">Comentario</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text-area"
                        id='contenido'
                        name='contenido'
                        value={comentario.contenido}
                        onChange={(e) => handleInputChange(e)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                        autoComplete='off'
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                    >
                        <img className='w-5 h-5' src="http://localhost:3000/uploads/addcomentar.png" alt="" />
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:bg-gray-500 bg-gray-700 py-2 px-4 rounded-md"
                    >
                        <img className='w-5 h-5' src="http://localhost:3000/uploads/circlecancel.png" alt="" />
                    </button>
                </div>


            </form>
            
        </Modal>
    );
};

export default ComentarModal;