import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../../services/userService";

import{ apiPromise}from "../../../services/api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {
  addAdmin,
  deleteUserById,
  removeAdmin,
  updateUserById,
} from "../../../services/userService";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = getUserFromLocalStorage();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const api = await apiPromise;
      const response = await api.get("/auth/getAllUsers");
      const usersWithCounts = response.data.data.map((user) => ({
        ...user,
        postCount: user.posts.length,
        commentCount: user.comments.length,
        postsCommentedOn: new Set(
          user.comments.map((comment) => comment.postId)
        ).size,
      }));
      setUsers(usersWithCounts);
      toast.success("Users fetched successfully!");
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      fetchUsers(); // Refresh the list after deletion
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleEditSave = async () => {
    try {
      const { id, fullNames, email } = editUser; // Updated to use fullNames
      await updateUserById(id, { fullNames, email });
      setEditUser(null);
      fetchUsers();
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleRoleChange = async (id, action) => {
    try {
      if (action === "add") {
        await addAdmin(id);
        toast.success("Admin role added successfully!");
      } else {
        await removeAdmin(id);
        toast.success("Admin role removed successfully!");
      }
      fetchUsers();
    } catch (error) {
      console.error(
        `Error ${action === "add" ? "adding" : "removing"} admin role:`,
        error
      );
      toast.error(
        `Failed to ${action === "add" ? "add" : "remove"} admin role. Please try again.`
      );
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullNames", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "postCount", headerName: "Post Count", width: 150 },
    { field: "commentCount", headerName: "Comment Count", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "postsCommentedOn", headerName: "Posts Commented On", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 450,
      renderCell: (params) => (
        <>
          {currentUser.role === "admin" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(params.row)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(params.row.id)}
                style={{ marginRight: "8px" }}
              >
                Delete
              </Button>
              {params.row.role !== "admin" && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleRoleChange(params.row.id, "add")}
                  style={{ marginRight: "8px" }}
                >
                  Add Admin
                </Button>
              )}
              {params.row.role === "admin" && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleRoleChange(params.row.id, "remove")}
                >
                  Remove Admin
                </Button>
              )}
            </>
          )}
          <Button
            variant="contained"
            color="info"
            onClick={() => setSelectedUser(params.row)}
          >
            View Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: "100%", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        style={{ border: "none" }}
      />
      {editUser && (
        <Dialog open={!!editUser} onClose={() => setEditUser(null)} fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Full Name"
              value={editUser.fullNames}
              onChange={(e) =>
                setEditUser({ ...editUser, fullNames: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditUser(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {selectedUser && (
        <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} fullWidth>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Details:
            </Typography>
            <div>
              <strong>Full Name:</strong> {selectedUser.fullNames}
            </div>
            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {selectedUser.phoneNumber}
            </div>
            <div>
              <strong>Role:</strong> {selectedUser.role}
            </div>
            <div>
              <strong>Post Count:</strong> {selectedUser.postCount}
            </div>
            <div>
              <strong>Comment Count:</strong> {selectedUser.commentCount}
            </div>
            <div>
              <strong>Posts Commented On:</strong> {selectedUser.postsCommentedOn}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedUser(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <ToastContainer />
    </div>
  );
};

export default UsersManagement;
