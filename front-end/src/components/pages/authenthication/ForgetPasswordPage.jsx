import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
  Link as MuiLink
} from "@mui/material";

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
    <Container component="main" maxWidth="xs"sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
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
            Forgot Password
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Request OTP
            </Button>
            <Grid container>
              <Grid item xs>
                <MuiLink component={Link} to="/login" variant="body2">
                  {"Back to login"}
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink component={Link} to="/signup" variant="body2">
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

export default ForgetPasswordPage;
