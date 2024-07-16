import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { obtenerProyectoById, getProyectos, updateProyecto, deleteProyecto } from '../services/ProyectoService';

function ModificarProyecto() {
    const { id } = useParams();
    const [proyectos, setProyectos] = useState([]);
    const [selectedProyecto, setSelectedProyecto] = useState('');
    const [proyectoData, setProyectoData] = useState({
        titulo: '',
        descripcion: '',
        empresa_licitante: '',
        fecha_inicio: '',
        fecha_termino: '',
        actividades: [
            { estado: '', /* otros campos */ },
            // más actividades
        ],
    });
    const navigate = useNavigate();

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
            // Convertir las fechas al formato adecuado para mostrar en los campos de formulario
            setProyectoData({
                ...response,
                fecha_inicio: response.fecha_inicio ? format(new Date(response.fecha_inicio), 'yyyy-MM-dd') : '',
                fecha_termino: response.fecha_termino ? format(new Date(response.fecha_termino), 'yyyy-MM-dd') : '',
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
    
        // Formatear las fechas al formato adecuado para enviar al backend (ISO 8601)
        const formattedData = {
            ...proyectoData,
            fecha_inicio: format(new Date(proyectoData.fecha_inicio), 'yyyy-MM-dd'),
            fecha_termino: format(new Date(proyectoData.fecha_termino), 'yyyy-MM-dd'),
            actividades: proyectoData.actividades.map(actividad => ({
                ...actividad,
                estado: actividad.estado || 'defaultEstado', // Proporciona un valor por defecto si es necesario
            })),
        };
    
        console.log('Datos enviados:', formattedData); // Añadir este console.log para ver los datos formateados
    
        try {
            await updateProyecto(proyectoData._id, formattedData);
            alert('Proyecto modificado con éxito');
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al modificar el proyecto', error);
            alert('Confirme los datos ingresados');
        }
    };
    

    const handleEliminarProyecto = async (id) => {
        try {
            await deleteProyecto(id);
            alert(`Proyecto con ID ${id} eliminado`);
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al eliminar el proyecto', error);
            alert('Se eliminó el proyecto');
        }
    };

    const formatDateForInput = (date) => {
        return date ? new Date(date).toISOString().slice(0, 10) : '';
    };

    return (
        <div>
            <h1 style={{ color: 'black' }}>Modificar Proyecto</h1>
            <label htmlFor="proyectoSelect">Seleccionar Proyecto:</label>
            <select
                id="proyectoSelect"
                value={selectedProyecto}
                onChange={handleSelectChange}
            >
                <option value="">Seleccione un proyecto</option>
                {proyectos.map((proyecto) => (
                    <option key={proyecto._id} value={proyecto._id}>
                        {proyecto.titulo}
                    </option>
                ))}
            </select>

            {selectedProyecto && (
                <div>
                    <form onSubmit={handleSubmit} className="modify-project-form">
                        <div className="mb-3">
                            <label htmlFor="titulo" className="text-black">Título:</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={proyectoData.titulo || ''}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descripcion" className="text-black">Descripción:</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={proyectoData.descripcion || ''}
                                onChange={handleInputChange}
                                className="form-control"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="empresa_licitante" className="text-black">Empresa Licitante:</label>
                            <input
                                type="text"
                                id="empresa_licitante"
                                name="empresa_licitante"
                                value={proyectoData.empresa_licitante || ''}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fecha_inicio" className="text-black">Fecha de inicio:</label>
                            <input
                                type="date"
                                id="fecha_inicio"
                                name="fecha_inicio"
                                value={formatDateForInput(proyectoData.fecha_inicio)}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fecha_termino" className="text-black">Fecha de término:</label>
                            <input
                                type="date"
                                id="fecha_termino"
                                name="fecha_termino"
                                value={formatDateForInput(proyectoData.fecha_termino)}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="text-black">Modificar Proyecto</button>
                    </form>

                    <div className="modify-project-actions">
                        <button onClick={() => handleEliminarProyecto(proyectoData._id)} className="text-black">Eliminar Proyecto</button>
                        <button onClick={() => navigate('/proyectos')} className="text-black">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModificarProyecto;
