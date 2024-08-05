import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { addAdmin, deleteUserById, getAllUsers, removeAdmin, updateUserById } from "../../../services/userService";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/auth/getAllUsers');
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleEditSave = async () => {
    try {
      const { id, name, email } = editUser; // Assuming these are the editable fields
      await updateUserById(id, { name, email });
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleRoleChange = async (id, action) => {
    try {
      if (action === 'add') {
        await addAdmin(id);
      } else {
        await removeAdmin(id);
      }
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action === 'add' ? 'adding' : 'removing'} admin role:`, error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleRoleChange(params.row.id, 'add')}
          >
            Add Admin
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleRoleChange(params.row.id, 'remove')}
          >
            Remove Admin
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      {editUser && (
        <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              fullWidth
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
    </div>
  );
};

export default UsersManagement;
