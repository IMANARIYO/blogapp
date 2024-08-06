import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { getUserFromLocalStorage } from "../../../services/userService";

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUserFromLocalStorage();
      setUser(userData);
      setUpdatedUser(userData);
    };
    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    // Implement the update user logic here
    setUser(updatedUser);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedUser(user);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={updatedUser.name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
            disabled={!editing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            disabled={!editing}
          />
        </Grid>
        <Grid item xs={12}>
          {editing ? (
            <div>
              <Button onClick={handleSave} variant="contained" color="primary" style={{ marginRight: 10 }}>
                Save
              </Button>
              <Button onClick={handleCancel} variant="outlined" color="secondary">
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={handleEdit} variant="contained" color="primary">
              Edit Profile
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;
