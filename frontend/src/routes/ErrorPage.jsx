import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/auth');
  };

  /**
   * Este mensaje de error, está pensado para los desarrolladores.
   * En un entorno de producción, no se debería mostrar este mensaje o almenos
   * no de esta forma.
   */
  console.error({
    status: error.status,
    statusText: error.statusText,
    message: error.message ? error.message : 'No message',
  });

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, un error inesperado a ocurrido.</p>
      <button onClick={handleRedirect}>Ir a la página de autenticación</button>
    </div>
  );
};

export default ErrorPage;
