import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { apiPromise}from "../../../services/api";

const ChangePasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    try {
      const api = await apiPromise;
      await api.post('/auth/change', data);
      setSuccess('Password changed successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Current Password:</label>
          <input type="password" {...register('currentpassword', { required: 'Current password is required' })} />
          {errors.currentpassword && <p>{errors.currentpassword.message}</p>}
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" {...register('newpassword', { required: 'New password is required' })} />
          {errors.newpassword && <p>{errors.newpassword.message}</p>}
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
