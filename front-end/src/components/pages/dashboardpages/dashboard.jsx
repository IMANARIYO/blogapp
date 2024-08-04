import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { getCommentsForPost } from "../../../services/commentsService";
import { getAllPosts } from "../../../services/postService";
import { getAllUsers } from "../../../services/userService";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const users = await getAllUsers();
      setUserCount(users.length);

      const posts = await getAllPosts();
      setPostCount(posts.length);

      let totalComments = 0;
      for (const post of posts) {
        const comments = await getCommentsForPost(post.id);
        totalComments += comments.length;
      }
      setCommentCount(totalComments);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Total Users
              </Typography>
              <Typography variant="h4">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Total Posts
              </Typography>
              <Typography variant="h4">{postCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Total Comments
              </Typography>
              <Typography variant="h4">{commentCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>
          Management Sections
        </Typography>
        <Paper style={{ padding: 20, display: 'flex', gap: 10 }}>
          <Button
            component={Link}
            to="/manage-comments"
            variant="contained"
            color="primary"
          >
            Comments Manage 
          </Button>
          <Button
            component={Link}
            to="/manage-posts"
            variant="contained"
            color="primary"
          >
             Posts management
          </Button>
          <Button
            component={Link}
            to="/manage-users"
            variant="contained"
            color="primary"
          >
             Users management
          </Button>
        </Paper>
      </div>
      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
