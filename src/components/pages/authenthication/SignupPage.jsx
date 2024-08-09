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
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('fullNames', data.fullNames);
    formData.append('profilePicture', data.profilePicture[0]);

    try {
      const api = await apiPromise;
      const response = await api.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);
      setError('');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');

      const newUser = {
        ...getLastDefaultUser(),
        id: default_users.length + 1,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        fullNames: data.fullNames,
        profilePicture: data.profilePicture[0].name,
      };
      addDefaultUser(newUser);
      setSuccess('Signup successful with a default user created for testing purposes!');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{ m: 1, width: 72, height: 72 }}
            src={profilePicturePreview || "/default-avatar.png"}
            alt="Profile Picture"
          />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  {...register('profilePicture', {
                    required: 'Profile picture is required',
                    onChange: handleProfilePictureChange,
                  })}
                />
              </Button>
              {errors.profilePicture && <Typography color="error" sx={{ mt: 1 }}>{errors.profilePicture.message}</Typography>}
            
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Full Names"
                  id="fullNames"
                  {...register('fullNames', { required: 'Full names are required' })}
                  error={!!errors.fullNames}
                  helperText={errors.fullNames?.message}
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
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone Number"
                id="phoneNumber"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
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
