import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import  RootUsuario  from '../components/RootUsuario.jsx';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log("User info:", user); // Verificar la información del usuario
  console.log("User roles:", user.roles); // Verificar los roles del usuario

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isAdmin = user.roles.some(role => role.name === 'admin');

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-200 rounded shadow-md text-gray-700 flex justify-between items-center p-4">
        <div>
          <h1 className="text-3xl mb-2">ERP</h1>
        </div>
        <RootUsuario />
      </div>
      <div className="flex">
        <div id="sidebar" className="w-64 bg-gray-300 text-gray-900 flex flex-col fixed transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-200 ease-in-out">
          <nav className="flex-grow">
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
                <a href="/asistencia" className="block py-2.5 px-4 rounded hover:bg-gray-700">Asistencia</a>
              </li>
              <li>
                <a href="#" className="block py-2.5 px-4 rounded hover:bg-gray-700">Inventario</a>
              </li>
              {isAdmin && (
                <li>
                  <a href="/usuarios" className="block py-2.5 px-4 rounded hover:bg-gray-700">Usuarios</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex-grow p-6 ml-64 md:ml-0 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
