import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerProyectoById, getProyectos, updateProyecto, deleteProyecto } from '../services/ProyectoService';
import { toast } from 'react-toastify';

const ModificarProyecto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [selectedProyecto, setSelectedProyecto] = useState('');
    const [proyectoData, setProyectoData] = useState({
        titulo: '',
        descripcion: '',
        empresa_licitante: '',
        fecha_inicio: '',
        fecha_termino: '',
        actividades: [],
    });

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const response = await getProyectos();
                setProyectos(response);
            } catch (error) {
                console.error('Error al obtener los proyectos', error);
            }
        };

        obtenerProyectos();

        if (id) {
            obtenerProyectoSeleccionado(id);
        }
    }, [id]);

    const obtenerProyectoSeleccionado = async (projectId) => {
        try {
            const response = await obtenerProyectoById(projectId);
            setProyectoData({
                ...response,
                fecha_inicio: response.fecha_inicio ? formatDateForInput(response.fecha_inicio) : '',
                fecha_termino: response.fecha_termino ? formatDateForInput(response.fecha_termino) : '',
            });
        } catch (error) {
            console.error('Error al obtener los detalles del proyecto', error);
            navigate('/proyectos/error');
        }
    };

    const handleSelectChange = async (event) => {
        const projectId = event.target.value;
        setSelectedProyecto(projectId);
        if (projectId) {
            await obtenerProyectoSeleccionado(projectId);
            navigate(`/proyectos/modificar/${projectId}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProyectoData({ ...proyectoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...proyectoData,
            fecha_inicio: formatDateToBackend(proyectoData.fecha_inicio),
            fecha_termino: formatDateToBackend(proyectoData.fecha_termino),
            actividades: proyectoData.actividades.map(actividad => ({
                ...actividad,
                estado: actividad.estado || 'defaultEstado',
            })),
        };

        console.log('Datos enviados:', formattedData);

        try {
            await updateProyecto(proyectoData._id, formattedData);
            toast.success('Proyecto modificado con éxito');
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al modificar el proyecto', error);
            toast.success('Proyecto modificado con éxito');
        }
    };

    const handleEliminarProyecto = async (id) => {
        try {
            await deleteProyecto(id);
            toast.success(`Proyecto con ID ${id} eliminado`);
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al eliminar el proyecto', error);
            toast.error('Error al eliminar el proyecto');
        }
    };

    const formatDateForInput = (date) => {
        return date ? new Date(date).toISOString().slice(0, 10) : '';
    };

    const formatDateToBackend = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <div className="">
                <div className='flex'>
                    <h1 className="text-2xl font-bold text-blue-900">Modificar Proyecto</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="proyectoSelect" className="block text-sm font-medium text-gray-700">Seleccionar Proyecto</label>
                        <select
                            id="proyectoSelect"
                            value={selectedProyecto}
                            onChange={handleSelectChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                        >
                            <option value="">Seleccione un proyecto</option>
                            {proyectos.map((proyecto) => (
                                <option key={proyecto._id} value={proyecto._id}>
                                    {proyecto.titulo}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedProyecto && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={proyectoData.titulo || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={proyectoData.descripcion || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="empresa_licitante" className="block text-sm font-medium text-gray-700">Empresa Licitante</label>
                                <input
                                    type="text"
                                    id="empresa_licitante"
                                    name="empresa_licitante"
                                    value={proyectoData.empresa_licitante || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                                <input
                                    type="date"
                                    id="fecha_inicio"
                                    name="fecha_inicio"
                                    value={formatDateForInput(proyectoData.fecha_inicio)}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fecha_termino" className="block text-sm font-medium text-gray-700">Fecha de término</label>
                                <input
                                    type="date"
                                    id="fecha_termino"
                                    name="fecha_termino"
                                    value={formatDateForInput(proyectoData.fecha_termino)}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Modificar Proyecto
                            </button>
                        </div>
                    )}
                </form>
                
                <div className="modify-project-actions mt-4">
                    <button
                        onClick={() => handleEliminarProyecto(proyectoData._id)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Eliminar Proyecto
                    </button>
                    <button
                        onClick={() => navigate('/proyectos')}
                        className="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModificarProyecto;
