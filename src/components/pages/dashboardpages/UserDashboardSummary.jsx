import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const UserDashboardSummary = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Posts</Typography>
              {/* Fetch and display total posts count here */}
              <Typography variant="h4">123</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Comments</Typography>
              {/* Fetch and display total comments count here */}
              <Typography variant="h4">456</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboardSummary;
