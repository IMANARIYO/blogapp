import React, { useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";

const ForgetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/forget', data);
      setSuccess('OTP sent to your email');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <button type="submit">Request OTP</button>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
