import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-200 rounded shadow-md text-gray-700 flex">
        <h1 className="text-3xl mb-4">ERP</h1>
        <p className="mb-2">usuario: {user.email}</p>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
      <div className="flex">
      <div id="sidebar" className="w-64 h-screen bg-gray-300 text-gray-900 flex flex-col fixed transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-200 ease-in-out">
        <nav className="flex-grow ">
          <ul>
            <li>
              <a href="/" className="block py-2.5 px-4 rounded hover:bg-gray-700">Inicio</a>
            </li>
            <li>
              <a href="/foro" className="block py-2.5 px-4 rounded hover:bg-gray-700">Foro</a>
            </li>
            <li>
              <a href="/proyectos" className="block py-2.5 px-4 rounded hover:bg-gray-700">Proyectos</a>
            </li>
            <li>
              <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700">Inventario</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-grow p-6 ml-64 md:ml-0">
        <Outlet />
      </div>
      </div>
    </div>
  );
}

export default Root;

