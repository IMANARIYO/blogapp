import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  Comment,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
  Menu as MenuIcon,
  People,
  PostAdd,
  Settings
} from "@mui/icons-material";
import {
  Avatar,
  Button,
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
  useTheme
} from "@mui/material";

const AdminDashboardLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

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
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-screen`}>
      {/* Sidebar */}
      <div
        className={`${
          open ? 'w-64' : 'w-16'
        } bg-gray-100 p-5 transition-width duration-300 relative overflow-auto`}
      >
        <Avatar
          src="/path/to/profile.jpg"
          alt="Profile"
          className="w-16 h-16 mb-5 cursor-pointer"
          onClick={handleProfileMenuOpen}
        />
        <Typography
          variant="h6"
          className={`text-center mb-5 ${open ? 'block' : 'hidden'}`}
        >
          Admin
        </Typography>
        <nav>
          <List>
            <ListItem button component={Link} to="/admin-dashboard" selected={isActive('/admin-dashboard')}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Dashboard" className={`${open ? 'block' : 'hidden'}`} />
            </ListItem>
            <ListItem button component={Link} to="/admin-dashboard/manage-comments" selected={isActive('/admin-dashboard/manage-comments')}>
              <ListItemIcon><Comment /></ListItemIcon>
              <ListItemText primary="Manage Comments" className={`${open ? 'block' : 'hidden'}`} />
            </ListItem>
            <ListItem button component={Link} to="/admin-dashboard/manage-posts" selected={isActive('/admin-dashboard/manage-posts')}>
              <ListItemIcon><PostAdd /></ListItemIcon>
              <ListItemText primary="Manage Posts" className={`${open ? 'block' : 'hidden'}`} />
            </ListItem>
            <ListItem button component={Link} to="/admin-dashboard/manage-users" selected={isActive('/admin-dashboard/manage-users')}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Users" className={`${open ? 'block' : 'hidden'}`} />
            </ListItem>
            <ListItem button onClick={handleSettingsToggle}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="Settings" className={`${open ? 'block' : 'hidden'}`} />
              {settingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {settingsOpen && (
              <div className="pl-5">
                <ListItem button component={Link} to="/admin-dashboard/settings/general" selected={isActive('/admin-dashboard/settings/general')}>
                  <ListItemText primary="General Settings" />
                </ListItem>
                <ListItem button component={Link} to="/admin-dashboard/settings/security" selected={isActive('/admin-dashboard/settings/security')}>
                  <ListItemText primary="Security Settings" />
                </ListItem>
              </div>
            )}
          </List>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col">
        <Paper className="p-5 mb-5 flex items-center">
          {isMobile && (
            <IconButton onClick={handleSidebarToggle} className="mr-5">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
        </Paper>
        <Outlet />
      </div>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/admin-dashboard/profile">
          <Avatar src="/path/to/profile.jpg" className="w-10 h-10 mr-2.5" />
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/admin-dashboard/profile/edit">
          <Settings className="mr-2.5" />
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/admin-dashboard/profile/change-password">
          <Settings className="mr-2.5" />
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>
          <Logout className="mr-2.5" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AdminDashboardLayout;
