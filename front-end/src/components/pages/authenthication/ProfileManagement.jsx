import React, { useState } from "react";
import { Cancel, Edit, Save } from "@mui/icons-material";
import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { updateUserById } from "./services/userService";

const ProfileManagement = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      await updateUserById(user.id, userData, profilePicture);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setUserData(user);
    setProfilePicture(null);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.profilePicture || "/default-avatar.png"} />}
        action={
          <IconButton onClick={() => setEditMode(!editMode)}>
            {editMode ? <Cancel /> : <Edit />}
          </IconButton>
        }
        title={editMode ? <TextField fullWidth name="name" value={userData.name} onChange={handleInputChange} /> : userData.name}
        subheader={editMode ? <TextField fullWidth name="email" value={userData.email} onChange={handleInputChange} /> : userData.email}
      />
      <Divider />
      <CardContent>
        {editMode ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-profile-picture"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-profile-picture">
                <Button variant="contained" component="span">
                  Upload Picture
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: 10 }}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Manage your profile details and settings here.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileManagement;
