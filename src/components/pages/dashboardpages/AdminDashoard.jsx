import AddPostPage from "../postspages/AddPostPage";
import AdminDashboardLayout from "./AdmindashoardLayout";
import CommentsManagement from "./CommentsManagement";
import DashboardSummary from "./DashboardSummary";
import PostsManagement from "./PostsManagement";
import React from "react";
import UserProfile from "./UserProfile";
import UsersManagement from "./UsersManagement";
import { Button, Typography } from "@mui/material";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboardLayout />}>
        <Route index element={<DashboardSummary />} /> {/* Default route */}
        <Route path="manage-comments" element={<CommentsManagement />} />
        <Route path="manage-posts" element={<PostsManagement />} />
        <Route path="manage-users" element={<UsersManagement />} />
        <Route path="manage-users/addpost" element={<AddPostPage />} />
        <Route path="profile" element={<UserProfile />} />
       
      </Route>
    </Routes>
  );
};

// const DashboardSummary = () => {
//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard Summary
//       </Typography>
//       {/* Add statistics, analytics, and summary content here */}
//       <p>Welcome to the admin dashboard. Here are some statistics...</p>
//       {/* You can add more detailed components or charts here */}
//     </div>
//   );
// };

export default AdminDashboard;
