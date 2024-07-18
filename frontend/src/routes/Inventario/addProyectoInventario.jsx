import { useState, useEffect } from 'react';
import { createInventarioProyecto } from './../../services/inventarioProyecto.service.js';
import { getProyectos } from '../../services/ProyectoService.js';
import { getInventario } from '../../services/inventario.service.js';
import { useNavigate } from 'react-router-dom';
import { get } from 'react-hook-form';


const AddProyectoInventario = () => {
    const navigate = useNavigate();
    const [proyecto, setproyecto] = useState([]);
    const [inventarioMH, setinventario] = useState([]);
    const [inventarioProyecto, setInventarioProyecto] = useState({
        proyecto: '',
        inventarios: [{inventario: '', cantidadAsignada: 0}],
    });

    useEffect(() => {
        fetchProyectoData();
        fetchInventarioData();
    }, []);

    const fetchProyectoData = async () => {
        try {
            const response = await getProyectos();
            const data = response;
            setproyecto(data);
        } catch (error) {
            console.error('Error fetching proyecto data:', error);
        }
    }

    const fetchInventarioData = async () => {
        try {
            const response = await getInventario();
            const data = response.data;
            setinventario(data);
        } catch (error) {
            console.error('Error fetching inventario data:', error);
        }
    }


  const handleCriteriaChange = (index, name, value) => {
    const updatedInventario = [...inventarioProyecto.inventarios];
    updatedInventario[index][name] = value;
    setInventarioProyecto({ ...inventarioProyecto, inventarios: updatedInventario });
  };

  const handleAddCriteria = () => {
    setInventarioProyecto({
      ...inventarioProyecto,
      inventarios: [...inventarioProyecto.inventarios, { inventario: "", cantidadAsignada: 0 }],
    });
  };

  const handleRemoveCriteria = (index) => {
    const updatedInventario = [...inventarioProyecto.inventarios];
    updatedInventario.splice(index, 1);
    setInventarioProyecto({ ...inventarioProyecto, inventarios: updatedInventario });
  };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventarioProyecto({ ...inventarioProyecto, [name]: value });
    };

    const getAvailableInventario = (index) => {
        const selectedInventarios = inventarioProyecto.inventarios.map(i => i.inventario);
        return inventarioMH.filter(item => item._id === inventarioProyecto.inventarios[index].inventario || !selectedInventarios.includes(item._id));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

            await createInventarioProyecto(inventarioProyecto);
            alert('Inventario Registrado con éxito');
            navigate('/proyectos/inventario');

            setInventarioProyecto({
                proyecto: '',
                inventarios: [{inventario: '', cantidad: 0}],
            });
        } catch (error) {
            console.error('Error al registrar el inventario:', error);
            alert('Hubo un error al registrar el inventario');
        }
    };

    return (
        <div>
            <div className="">
                
                <div className=''>
                    <h1 className="text-2xl text-center font-bold text-blue-900 ">Registrar Inventario</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Proyecto</label>
                    <select
                    type="text"
                    id='proyecto'
                    name='proyecto'
                    value={inventarioProyecto.proyecto}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-300 text-gray-700"
                        >
                            <option value=''>Seleccione una opción</option>
                            {proyecto.map((item) => (
                                <option key={item._id} value={item._id}>{item.titulo}</option>
                            ))}
                    </select>
                    </div>
                 <div className=" text-gray-700">
                    <label>
                    </label>
                        <div className='flex justify-between'>
                            <div>
                                <h3>Material o Herramienta</h3>
                            </div>
                            <div>
                                <h3>Cantidad</h3>
                            </div>
                    <div className="d-flex justify-content-end mb-3 mr-3">
                        <button
                        type="button"
                        onClick={handleAddCriteria}
                        className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Añadir
                        </button>
                    </div>
                    </div>
                    

                    {inventarioProyecto.inventarios?.map((criteria, index) => (
                        <div key={index} className='flex mb-3'>
                        <span className='mr-1'>{`${index + 1}: `}</span>
                        <select
                            type="text"
                            id='inventario'
                            name='inventario'
                            value={criteria.inventario}
                            className="px-3 py-2 mr-2 max-h-10 min-w-max border border-gray-300 rounded-md shadow-sm focus:outline-none  bg-gray-300 text-gray-700"
                            onChange={(e) =>
                                handleCriteriaChange(index, "inventario", e.target.value)
                            }
                            >
                                <option value=''>Seleccione una opción</option>
                                {getAvailableInventario(index).map((item) => (
                                    <option key={item._id} value={item._id}>{item.material.nombre} : {item.material.descripcion} : {item.cantidad} existencias</option>
                                ))}
                        </select>
                        <span></span>
                        <div>
                                <input
                                    type="number"
                                    id='cantidadAsignada'
                                    name='cantidadAsignada'
                                    min={0}
                                    value={criteria.cantidadAsignada}
                                    onChange={(e) => handleCriteriaChange(index, "cantidadAsignada", e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  bg-gray-300 text-gray-700"
                            />
                        </div>
                        <div className="d-flex justify-content-end mb-3 mr-3">
                            <button
                            type="button"
                            onClick={() => handleRemoveCriteria(index)}
                            className="justify-center ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Eliminar
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>

                <button
                    type="submit"
                    className="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Asignar
                </button>
                </form>
                
            </div>
            
        </div>
    );
};

export default AddProyectoInventario;