import React from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

// src/components/Sidebar.js


const Sidebar = () => {
  return (
    <div style={{ width: 240, padding: 20, backgroundColor: "#f4f4f4", height: '100vh', position: 'fixed' }}>
      <List>
        <ListItem button component={Link} to="/manage-comments">
          <ListItemText primary="Manage Comments" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/manage-posts">
          <ListItemText primary="Manage Posts" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/manage-users">
          <ListItemText primary="Manage Users" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
