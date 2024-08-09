import CommentsManagement from "./CommentsManagement";
import PostsManagement from "./PostsManagement";
import React from "react";
import UserDashboardLayout from "./UserDashboardLayout";
import UserDashboardSummary from "./UserDashboardSummary";
import UserProfile from "./UserProfile";
import { Route, Routes } from "react-router-dom";

const UserDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboardLayout />}>
        <Route index element={<UserDashboardSummary />} />
        <Route path="summary" element={<UserDashboardSummary />} />
        <Route path="posts" element={<PostsManagement />} />
        <Route path="comments" element={<CommentsManagement />} />
        <Route path="profile" element={<UserProfile />} />
       
      </Route>
    </Routes>
  );
};

export default UserDashboard;
