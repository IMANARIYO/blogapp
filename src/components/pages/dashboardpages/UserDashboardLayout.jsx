import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  Comment,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
  Menu as MenuIcon,
  PostAdd,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const UserDashboardLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: open ? 250 : 60,
          backgroundColor: "#f4f4f4",
          padding: 20,
          transition: "width 0.3s",
          position: "relative",
          overflow: "auto",
        }}
      >
        <Avatar
          src="/path/to/profile.jpg"
          alt="Profile"
          style={{
            width: 60,
            height: 60,
            marginBottom: 20,
            cursor: "pointer",
          }}
          onClick={handleProfileMenuOpen}
        />
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            marginBottom: 20,
            display: open ? "block" : "none",
          }}
        >
          User
        </Typography>
        <nav>
          <List>
            <ListItem
              button
              component={Link}
              to="/dashboard"
              selected={isActive("/dashboard")}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                style={{ display: open ? "block" : "none" }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/posts"
              selected={isActive("/dashboard/posts")}
            >
              <ListItemIcon>
                <PostAdd />
              </ListItemIcon>
              <ListItemText
                primary="Manage Posts"
                style={{ display: open ? "block" : "none" }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/comments"
              selected={isActive("/dashboard/comments")}
            >
              <ListItemIcon>
                <Comment />
              </ListItemIcon>
              <ListItemText
                primary="Manage Comments"
                style={{ display: open ? "block" : "none" }}
              />
            </ListItem>
            <ListItem button onClick={handleSettingsToggle}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                style={{ display: open ? "block" : "none" }}
              />
              {settingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {settingsOpen && (
              <div style={{ paddingLeft: 20 }}>
                <ListItem
                  button
                  component={Link}
                  to="/dashboard/settings/general"
                  selected={isActive("/dashboard/settings/general")}
                >
                  <ListItemText primary="General Settings" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/dashboard/settings/security"
                  selected={isActive("/dashboard/settings/security")}
                >
                  <ListItemText primary="Security Settings" />
                </ListItem>
              </div>
            )}
          </List>
        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          style={{
            padding: 20,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isMobile && (
            <IconButton onClick={handleSidebarToggle} style={{ marginRight: 20 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4" gutterBottom>
            User Dashboard
          </Typography>
        </Paper>
        <Outlet />
      </div>

      {/* Profile Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/dashboard/profile">
          <Avatar src="/path/to/profile.jpg" style={{ width: 40, height: 40, marginRight: 10 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/dashboard/profile/edit">
          <Settings style={{ marginRight: 10 }} />
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/dashboard/profile/change-password">
          <Settings style={{ marginRight: 10 }} />
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>
          <Logout style={{ marginRight: 10 }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserDashboardLayout;
