import React from "react";
import { Button, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: 250, backgroundColor: '#f4f4f4', padding: 20 }}>
        <Typography variant="h6" gutterBottom>
          Admin Dashboard
        </Typography>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Button
                component={Link}
                to="/admin/manage-comments"
                variant="contained"
                color="primary"
                style={{ marginBottom: 10, width: '100%' }}
              >
                Manage Comments
              </Button>
            </li>
            <li>
              <Button
                component={Link}
                to="/admin/manage-posts"
                variant="contained"
                color="primary"
                style={{ marginBottom: 10, width: '100%' }}
              >
                Manage Posts
              </Button>
            </li>
            <li>
              <Button
                component={Link}
                to="/admin/manage-users"
                variant="contained"
                color="primary"
                style={{ marginBottom: 10, width: '100%' }}
              >
                Manage Users
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 20 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
