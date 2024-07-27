import { useState, useEffect } from 'react';
import { updateForo, getForoById } from './../../services/foro.service.js';
import { useNavigate, useParams } from 'react-router-dom';
import UploadModal from './UploadModal.jsx';
import { toast } from 'react-toastify';

const EditarMisPublicaciones = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publicacion, setPublicacion] = useState({
        titulo: '',
        contenido: '',
        imagen: '',
        comentarios: [],
        autor: '',
        fechaCreacion: '',
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (id) {
            publicacionDataById(id);
        }
    }, [id]);

    const publicacionDataById = async (id) => {
        try {
            const response = await getForoById(id);
            setPublicacion(
                {
                    titulo: response.data.titulo,
                    contenido: response.data.contenido,
                    imagen: response.data.imagen._id,
                    comentarios: response.data.comentarios,
                    autor: response.data.autor,
                    fechaCreacion: response.data.fechaCreacion,
                }
            );
        } catch (error) {
            console.error('Error al obtener la publicación:', error);
            alert('Hubo un error al obtener la publicación');
        }
    };


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleFileUpload = (fileId) => {
        setPublicacion({ 
            titulo: publicacion.titulo,
            contenido: publicacion.contenido,
            imagen: fileId,
            comentarios: publicacion.comentarios,
            autor: publicacion.autor,
            fechaCreacion: publicacion.fechaCreacion,
        });
    };


    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const newPublicacion = {
                titulo: publicacion.titulo,
                contenido: publicacion.contenido,
                imagen: publicacion.imagen,
                comentarios: publicacion.comentarios,
                autor: publicacion.autor,
                fechaCreacion: publicacion.fechaCreacion,
            };
            console.log(newPublicacion);
            await updateForo(id, newPublicacion);
            toast.success('Publicación editada con éxito');
            navigate('/foro/mispublicaciones');
            setPublicacion({
                titulo: '',
                contenido: '',
                imagen: '',
                comentarios: [],
                autor: '',
            });
            setImageFile(null);
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            toast.error(error);
        }
    };

    return (
        <div>
            <div className="">
                
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold text-blue-900 ">Nueva Publicacion</h1>
                    <button onClick={openModal} className=' py-2 px-3 border border-transparent shadow-sm rounded-md 
                    bg-violet-500'
                    >
                        <img className='w-5 h-5' src={`${import.meta.env.VITE_BASE_URL}/uploads/addphoto.png`} alt="" />
                    </button>
                        <UploadModal isOpen={modalIsOpen} onClose={closeModal} onFileUpload={handleFileUpload} />   
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Titulo</label>
                    <input
                    type="text"
                    id='titulo'
                    name='titulo'
                    value={publicacion.titulo}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                    autoComplete='off'
                    />
                    </div>
                    
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contenido</label>
                        <textarea
                            type="text"
                            id='contenido'
                            name='contenido'
                            value={publicacion.contenido}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-1 w-full h-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  bg-gray-300 text-gray-700"
                            autoComplete='off'
                    />
                </div>
                <button
                    type="submit"
                    className="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Modificar
                </button>
                </form>
                
            </div>
            
        </div>
    );
};

export default EditarMisPublicaciones;