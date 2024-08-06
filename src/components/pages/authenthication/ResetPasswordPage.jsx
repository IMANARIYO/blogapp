import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { apiPromise}from "../../../services/api";

const ResetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    try {
      const api = await apiPromise;
      await api.post('/auth/reset', data);
      setSuccess('Password reset successful');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>OTP:</label>
          <input type="text" {...register('otp', { required: 'OTP is required' })} />
          {errors.otp && <p>{errors.otp.message}</p>}
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" {...register('newpassword', { required: 'New password is required' })} />
          {errors.newpassword && <p>{errors.newpassword.message}</p>}
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
