import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App.jsx';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import ProyectoList from './components/ProyectoList.jsx';
import './components/Proyectos.jsx'
import './index.css';
import Proyectos from './components/Proyectos.jsx';
import ModificarProyecto from './components/ModificarProyecto.jsx';
import AgregarPublicacion from './components/AgregarPublicacion.jsx';
import Foro from './routes/Foro/Foro.jsx';
import Asistencia from './components/AttendanceForm.jsx';
import NuevoForo from './routes/Foro/ForoPublicacion.jsx';

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
        path: '/proyectos/modificar/',
        element: <ModificarProyecto />,
      },
      {
        path: '/proyectos/agregar',
        element: <AgregarPublicacion />,
      },
      {
        path: '/foro',
        element: <Foro />,
      },
      {
        path: '/foro/nuevo',
        element: <NuevoForo />,
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  
  {
    path: '/asistencia',
    element: <Asistencia />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
