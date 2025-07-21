import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role: 'employee'
    }
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/api/register', data);
      toast.success('Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500">Start your journey with us today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter name"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email'
                }
              })}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              placeholder="Employee"
              {...register('role')}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
