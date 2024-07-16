import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App.jsx';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import ProyectoList from './components/ProyectoList.jsx';
import './components/Proyectos.jsx';
import './index.css';
import Proyectos from './components/Proyectos.jsx';
import ModificarProyecto from './components/ModificarProyecto.jsx';
import Foro from './routes/Foro/Foro.jsx';
import Asistencia from './components/AttendanceForm.jsx';
import NuevoForo from './routes/Foro/ForoPublicacion.jsx';
import UserManagement from './components/UserManagement.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgregarProyecto from './components/AgregarProyecto.jsx';
import AgregarActividad from './components/AgregarActividades.jsx';

// Dentro de tu configuración de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/proyectos',
        element: <Proyectos />,
      },
      {
        path: '/proyectos/ver',
        element: <ProyectoList />,
      },
      {
        path: '/proyectos/modificar/:id',
        element: <ModificarProyecto />,
      },
      {
        path: '/proyectos/modificar/',
        element: <ModificarProyecto />,
      },
      {
        path: '/proyectos/agregar',
        element: <AgregarProyecto />,
      },
      {
        path: '/proyectos/agregaractividad',
        element: <AgregarActividad />,
      },
      {
        path: '/foro',
        element: <Foro />,
      },
      {
        path: '/foro/nuevo',
        element: <NuevoForo />,
      },
      {
        path: '/asistencia',
        element: <Asistencia />,
      },
      {
        path: '/usuarios',
        element: <UserManagement />,
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);