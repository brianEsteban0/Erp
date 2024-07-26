import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerProyectoById, getProyectos, updateProyecto, deleteProyecto, addActividadToProyecto } from '../services/ProyectoService';
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
        presupuesto: '',
        actividades: [],
    });
    const [nuevaActividad, setNuevaActividad] = useState({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_termino: '',
        responsable: '',
        estado: false,
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

    const handleActividadInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaActividad({ ...nuevaActividad, [name]: value });
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

        try {
            await updateProyecto(proyectoData._id, formattedData);
            toast.success('Proyecto modificado con éxito');
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al modificar el proyecto', error);
            toast.error('Error al modificar el proyecto, verificar datos');
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

    const handleAddActividad = async (e) => {
        e.preventDefault();
        try {
            await addActividadToProyecto(proyectoData._id, nuevaActividad);
            setProyectoData((prevData) => ({
                ...prevData,
                actividades: [...prevData.actividades, nuevaActividad],
            }));
            setNuevaActividad({
                nombre: '',
                descripcion: '',
                fecha_inicio: '',
                fecha_termino: '',
                responsable: '',
                estado: false,
            });
            toast.success('Actividad añadida con éxito');
        } catch (error) {
            console.error('Error al agregar la actividad', error);
            toast.error('Error al agregar la actividad');
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
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                                <input
                                    type="date"
                                    id="fecha_inicio"
                                    name="fecha_inicio"
                                    value={proyectoData.fecha_inicio || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fecha_termino" className="block text-sm font-medium text-gray-700">Fecha Término</label>
                                <input
                                    type="date"
                                    id="fecha_termino"
                                    name="fecha_termino"
                                    value={proyectoData.fecha_termino || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700">Presupuesto</label>
                                <input
                                    type="number"
                                    id="presupuesto"
                                    name="presupuesto"
                                    value={proyectoData.presupuesto || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                                />
                            </div>

                            <div className="mb-3">
                                <h2 className="text-lg font-semibold">Actividades</h2>
                                <ul className="list-disc pl-5">
                                    {proyectoData.actividades && proyectoData.actividades.map((actividad, index) => (
                                        <li key={index} className="mb-2">{actividad.nombre}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h2 className="text-lg font-semibold">Agregar Actividad</h2>
                                <div>
                                    <label htmlFor="actividadNombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        id="actividadNombre"
                                        name="nombre"
                                        value={nuevaActividad.nombre}
                                        onChange={handleActividadInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="actividadDescripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <textarea
                                        id="actividadDescripcion"
                                        name="descripcion"
                                        value={nuevaActividad.descripcion}
                                        onChange={handleActividadInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="actividadFechaInicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                                    <input
                                        type="date"
                                        id="actividadFechaInicio"
                                        name="fecha_inicio"
                                        value={nuevaActividad.fecha_inicio}
                                        onChange={handleActividadInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="actividadFechaTermino" className="block text-sm font-medium text-gray-700">Fecha Término</label>
                                    <input
                                        type="date"
                                        id="actividadFechaTermino"
                                        name="fecha_termino"
                                        value={nuevaActividad.fecha_termino}
                                        onChange={handleActividadInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="actividadResponsable" className="block text-sm font-medium text-gray-700">Responsable</label>
                                    <input
                                        type="text"
                                        id="actividadResponsable"
                                        name="responsable"
                                        value={nuevaActividad.responsable}
                                        onChange={handleActividadInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="actividadEstado" className="block text-sm font-medium text-gray-700">Estado</label>
                                    <input
                                        type="checkbox"
                                        id="actividadEstado"
                                        name="estado"
                                        checked={nuevaActividad.estado}
                                        onChange={(e) => setNuevaActividad({ ...nuevaActividad, estado: e.target.checked })}
                                        className="mt-1"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAddActividad}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Añadir Actividad
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                                Guardar Cambios
                            </button>

                            <button
                                type="button"
                                onClick={() => handleEliminarProyecto(proyectoData._id)}
                                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Eliminar Proyecto
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ModificarProyecto;
