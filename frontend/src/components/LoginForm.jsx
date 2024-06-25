import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <input
        name="email"
        type="email"
        {...register('email', { required: true })}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        {...register('password', { required: true })}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        placeholder="Password"
      />
      {errors.exampleRequired && <span className="text-red-500">This field is required</span>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Login
      </button>
    </form>
  );
}

export default LoginForm;

