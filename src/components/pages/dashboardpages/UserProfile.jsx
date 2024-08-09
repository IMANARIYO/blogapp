import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullNames: "",
    username: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/users/update", user);
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Full Names" name="fullNames" value={user.fullNames} onChange={handleChange} fullWidth />
      <TextField label="Username" name="username" value={user.username} onChange={handleChange} fullWidth />
      <TextField label="Email" name="email" value={user.email} onChange={handleChange} fullWidth disabled />
      <TextField label="Phone Number" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} fullWidth />
      <Button type="submit" variant="contained" color="primary">Update Profile</Button>
    </form>
  );
};

export default UserProfile;
