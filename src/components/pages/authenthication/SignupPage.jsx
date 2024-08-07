import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiPromise } from "../../../services/api";
import { addDefaultUser, default_users, getLastDefaultUser } from "../../../services/constants/users";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CssBaseline,
  Avatar,
  Paper,
} from "@mui/material";

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('phoneNumber', data.phoneNumber);

    try {
      const api = await apiPromise;
      const response = await api.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);
      setError('');

      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');

      // Create a new default user with an incremented ID
      const newUser = {
        ...getLastDefaultUser(),
        id: default_users.length + 1,
        email: data.email, // Override with the actual email
        password: data.password, // Note: Password should be hashed in a real application
        phoneNumber: data.phoneNumber, // Add phone number
      };
      addDefaultUser(newUser);
      setSuccess('Signup successful with a default user created for testing purposes!');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
               <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Full Names"
                id="fullNames"
                {...register('fullNames')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone Number"
                id="phoneNumber"
                {...register('phoneNumber')}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="textPrimary">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="textPrimary">
                    {"Already have an account? Login"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
