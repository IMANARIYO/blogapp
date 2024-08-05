import CommentsManagement from "./CommentsManagement";
import PostsManagement from "./PostsManagement";
import React from "react";
import UsersManagement from "./UsersManagement";
import { Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const Dashboard = () => {
    alert(hello)
  return (
    <div style={{ padding: 20 }}>
      {/* Dashboard Navigation */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Manage Comments
              </Typography>
              <Button
                component={Link}
                to="/dashboard/manage-comments"
                variant="contained"
                color="primary"
              >
                Go to Comments Management
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Manage Posts
              </Typography>
              <Button
                component={Link}
                to="/dashboard/manage-posts"
                variant="contained"
                color="primary"
              >
                Go to Posts Management
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Manage Users
              </Typography>
              <Button
                component={Link}
                to="/dashboard/manage-users"
                variant="contained"
                color="primary"
              >
                Go to Users Management
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Nested Routing */}
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>
          Management Sections
        </Typography>
        <Routes>
          <Route path="manage-comments" element={<CommentsManagement />} />
          <Route path="manage-posts" element={<PostsManagement />} />
          <Route path="manage-users" element={<UsersManagement />} />
          <Route path="/" element={<Typography variant="h6">Please select a section.</Typography>} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
