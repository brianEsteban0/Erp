import { useState, useEffect } from 'react';
import { getForo } from './../../services/foro.service.js';
const Foro = () => {

    const [publicacion, setpublicacion] = useState([]);
    
    const fetchData = async () => {
      try {
          const [foroResponse] = await Promise.all([getForo()]);
          console.log(foroResponse.data);
          setpublicacion(foroResponse.data);
      } catch (error) {
          console.error("Error al obtener datos", error);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatearFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    const getPhotoUrl = (url) => {
    return url.startsWith('http') ? url : `http://localhost:3000${url}`;
    };

    return (
        <div>
            <div className='text-center'>
                <h1 className='text-gray-700'>Foro Empresa</h1>
            </div>
            <div className='flex'>
                <p className='text-gray-700'>Ultimas publicaciones</p>
                <p href="/nuevaPublicacion" className='text-black'>+</p>
            </div>
            
            <div>
                {publicacion.map((post) => (
                    <div key={post._id}>
                        <div className='flex'>
                            <p className='text-gray-900'>{post.autor}</p>
                            <h2 className='text-gray-700'>{post.titulo}</h2>
                        </div>
                        {post.imagen && <img src={getPhotoUrl(post.imagen.imageUrl)} alt='imagen' />}
                        {post.imagen && console.log(post.imagen.imageUrl)}
                    <p className='text-gray-900'>{post.contenido}</p>
                    <p className='text-gray-900'>{formatearFecha(post.fechaCreacion)}</p>                    
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Foro;