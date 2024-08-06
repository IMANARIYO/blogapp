import React from "react";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Paper as TablePaper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import {
  PostAdd as PostAddIcon,
  Comment as CommentIcon,
  Group as GroupIcon,
  Update as UpdateIcon
} from "@mui/icons-material";

// Sample data for the charts and table
const monthlyData = [
  { name: "Jan", posts: 400, comments: 240, users: 30 },
  { name: "Feb", posts: 300, comments: 139, users: 20 },
  { name: "Mar", posts: 200, comments: 980, users: 27 },
  { name: "Apr", posts: 278, comments: 390, users: 25 },
  { name: "May", posts: 189, comments: 480, users: 30 },
  { name: "Jun", posts: 239, comments: 380, users: 35 },
  { name: "Jul", posts: 349, comments: 430, users: 40 },
];

const pieData = [
  { name: "Posts", value: 120 },
  { name: "Comments", value: 350 },
  { name: "Users", value: 45 },
];

const recentActivities = [
  { date: "2024-08-01", user: "John Doe", action: "Added a new post" },
  { date: "2024-07-29", user: "Jane Smith", action: "Commented on a post" },
  { date: "2024-07-25", user: "Alice Johnson", action: "Joined the platform" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const DashboardSummary = () => {
  const totalPosts = 120;
  const totalComments = 350;
  const totalUsers = 45;
  const avgPostsPerUser = (totalPosts / totalUsers).toFixed(2);
  const avgCommentsPerUser = (totalComments / totalUsers).toFixed(2);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard Summary
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Section */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <PostAddIcon fontSize="large" color="primary" />
              <Typography variant="h6">Total Posts</Typography>
              <Typography variant="h4" color="primary">
                {totalPosts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <CommentIcon fontSize="large" color="primary" />
              <Typography variant="h6">Total Comments</Typography>
              <Typography variant="h4" color="primary">
                {totalComments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <GroupIcon fontSize="large" color="primary" />
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" color="primary">
                {totalUsers}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Avg Posts/User: {avgPostsPerUser}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Avg Comments/User: {avgCommentsPerUser}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {/* Line Chart for Monthly Posts and Comments */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", borderRadius: '10px', elevation: 3 }}>
            <Typography variant="h5" gutterBottom>
              Monthly Posts and Comments
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="posts" stroke="#8884d8" name="Posts" />
                <Line type="monotone" dataKey="comments" stroke="#82ca9d" name="Comments" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart for Users Joined Per Month */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", borderRadius: '10px', elevation: 3 }}>
            <Typography variant="h5" gutterBottom>
              Users Joined Per Month
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Users Joined" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart for Activity Distribution */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", borderRadius: '10px', elevation: 3 }}>
            <Typography variant="h5" gutterBottom>
              Activity Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Line Chart for Average Monthly Activity */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", borderRadius: '10px', elevation: 3 }}>
            <Typography variant="h5" gutterBottom>
              Average Monthly Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="posts" stroke="#8884d8" name="Posts" />
                <Line type="monotone" dataKey="comments" stroke="#82ca9d" name="Comments" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Last Updated Section */}
        <Grid item xs={12}>
          <Paper style={{ padding: "20px", textAlign: "center", borderRadius: '10px', elevation: 3 }}>
            <UpdateIcon fontSize="large" color="primary" />
            <Typography variant="h6">Last Updated</Typography>
            <Typography variant="body1">
              {new Date().toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Activities Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Recent Activities
          </Typography>
          <TableContainer component={TablePaper} style={{ borderRadius: '10px', elevation: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardSummary;
