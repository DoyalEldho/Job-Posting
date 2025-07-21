import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/api/login', data, {
        withCredentials: true,
      });

      const { role } = res.data;

      localStorage.setItem('isLoggedIn', 'true');

      if (role === 'company') {
        localStorage.setItem('company', 'true');
         toast.success('Login successfully!');
        navigate('/company/post-job', { replace: true });
      } else {
        localStorage.setItem('isUser', 'true');
        toast.success('Login successfully!');
        navigate('/employee/all-jobs');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM1rSWpZ_YzzmCC3ZReO4D8tUAoWbeiR6WiQ&s"
            alt="Job Portal"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Log in to find your next opportunity</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
