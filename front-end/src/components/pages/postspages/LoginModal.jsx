import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import api from "../../../services/api";
import { Avatar, Box, Button, Grid, Link as MuiLink, Modal, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ open, handleClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user)); // Save user info
      setSuccess('Login successful!');
      setError('');
      handleClose(); // Close modal on successful login
      onLoginSuccess(); // Notify parent component of successful login
     
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="login-modal-title" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        {success && <Typography color="success" sx={{ mb: 2 }}>{success}</Typography>}
        <Box component="form" onSubmit={handleLoginSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email}
            helperText={!email && 'Email is required'}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password}
            helperText={!password && 'Password is required'}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!email || !password}
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
    </Modal>
  );
};

export default LoginModal;
