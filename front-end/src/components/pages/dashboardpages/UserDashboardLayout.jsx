import React from "react";
import { Button, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: 250, backgroundColor: '#f4f4f4', padding: 20, borderRight: '1px solid #ddd' }}>
        <Typography variant="h6" gutterBottom>User Dashboard</Typography>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: 10 }}>
              <Link to="summary" style={{ textDecoration: 'none', color: '#000' }}>
                <Button variant="contained" fullWidth>Dashboard Summary</Button>
              </Link>
            </li>
            <li style={{ marginBottom: 10 }}>
              <Link to="posts" style={{ textDecoration: 'none', color: '#000' }}>
                <Button variant="contained" fullWidth>Manage Posts</Button>
              </Link>
            </li>
            <li style={{ marginBottom: 10 }}>
              <Link to="comments" style={{ textDecoration: 'none', color: '#000' }}>
                <Button variant="contained" fullWidth>Manage Comments</Button>
              </Link>
            </li>
            <li style={{ marginBottom: 10 }}>
              <Link to="profile" style={{ textDecoration: 'none', color: '#000' }}>
                <Button variant="contained" fullWidth>User Profile</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
