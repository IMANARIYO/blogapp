import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPromise } from "../../../services/api";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const ResetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize `useNavigate`
  const location = useLocation(); // Use `useLocation` to access the query params

  // Function to get query parameters
  const getQueryParams = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  // On component mount, set the email field to the value from query params
  useEffect(() => {
    const email = getQueryParams('email');
    if (email) {
      setValue('email', email); // Pre-fill the email field
    }
  }, [setValue, location]);

  const onSubmit = async (data) => {
    try {
      const api = await apiPromise;
      await api.post('/auth/reset', data);
      setSuccess('Password reset successful!');
      setError('');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
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
            Reset Password
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
              label="OTP"
              id="otp"
              autoComplete="otp"
              {...register('otp', { required: 'OTP is required' })}
              error={!!errors.otp}
              helperText={errors.otp?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              id="newpassword"
              autoComplete="new-password"
              {...register('newpassword', { required: 'New password is required' })}
              error={!!errors.newpassword}
              helperText={errors.newpassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  onClick={() => navigate('/login')}
                  sx={{ cursor: 'pointer' }}
                >
                  {"Back to login"}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  onClick={() => navigate('/signup')}
                  sx={{ cursor: 'pointer' }}
                >
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
