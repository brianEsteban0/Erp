import { useState, useEffect } from 'react';
import { getForo, getForoById } from './../../services/foro.service.js';
const Foro = () => {
    /*const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the server and update the state
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };  

        fetchPosts();
    }, []);
    */
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

    return (
        <div>
            <h1>Foro</h1>
            {publicacion.map((post) => (
                <div key={post._id}>
                    <h2>{post.titulo}</h2>
                    <p>{post.contenido}</p>
                </div>
            ))}
        </div>
    );
};

export default Foro;