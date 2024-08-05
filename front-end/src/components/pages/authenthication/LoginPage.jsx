import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getLastDefaultUser } from "../../../services/constants/users";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user)); // Save user info
      setSuccess('Login successful!');
      setError('');
      
      navigate('/dashboard'); // Redirect to home page on successful login
      window.location.reload(); // Reload the page
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
        // Check if the default user exists and matches
        const defaultUser = getLastDefaultUser();
        if (defaultUser.email == data.email && defaultUser.password == data.password) {
          localStorage.setItem('token', 'dummy-token'); // Set a dummy token
          localStorage.setItem('user', JSON.stringify(defaultUser)); // Save default user info
          setSuccess('Login successful with default user!');
          setError('');
          navigate('/dashboard'); // Redirect to dashboard or main page
        } else {
          console.log('Default user does not match',defaultUser);
          console.log('data to match',data);
          setError('Invalid username or password');
        }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
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
            Login
          </Typography>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <MuiLink
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/signup')}
                >
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;