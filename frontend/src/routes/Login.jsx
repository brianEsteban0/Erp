import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <>
        <h2>Ya estas logeado!</h2>
        <button onClick={() => navigate('/')}>Ir a home</button>
      </>
    );
  }

  return (
    <div className='container px-4 mx-auto'>
      <div className='max-w-lg mx-auto'>
        <div className='text-center mb-6'>
          <h2 className='text-3xl md:text-4xl font-extrabold'>Inicia sesion!</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
