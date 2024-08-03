import React, { useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [view, setView] = useState('login'); // To switch between login, signup, and reset

  const onSubmit = async (data) => {
    try {
      if (view === 'login') {
        const response = await api.post('/auth/login', data);
        localStorage.setItem('token', response.data.access_token);
        setSuccess('Login successful!');
        setError('');
      } else if (view === 'signup') {
        await api.post('/auth/signup', data);
        setSuccess('Signup successful! Please login.');
        setError('');
      } else if (view === 'reset') {
        await api.post('/auth/reset', data);
        setSuccess('Password reset link sent!');
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">{view === 'login' ? 'Login' : view === 'signup' ? 'Sign Up' : 'Reset Password'}</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {view !== 'reset' && (
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          )}
          {view !== 'reset' && (
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          )}
          {view === 'reset' && (
            <div>
              <label className="block text-gray-700">New Password:</label>
              <input
                type="password"
                {...register('newPassword', { required: 'New password is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {view === 'login' ? 'Login' : view === 'signup' ? 'Sign Up' : 'Reset Password'}
          </button>
        </form>
        <div className="mt-4 text-center">
          {view === 'login' && (
            <>
              <p className="text-gray-600">Don't have an account? <button onClick={() => setView('signup')} className="text-blue-600 hover:underline">Sign Up</button></p>
              <p className="text-gray-600 mt-2"><button onClick={() => setView('reset')} className="text-blue-600 hover:underline">Forgot Password?</button></p>
            </>
          )}
          {view === 'signup' && (
            <p className="text-gray-600">Already have an account? <button onClick={() => setView('login')} className="text-blue-600 hover:underline">Login</button></p>
          )}
          {view === 'reset' && (
            <p className="text-gray-600">Remembered your password? <button onClick={() => setView('login')} className="text-blue-600 hover:underline">Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
