import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { deletePostById, getAllPosts } from "../../../services/postService";
import { getUserFromLocalStorage } from "../../../services/userService";

const PostsManagement = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const user = getUserFromLocalStorage(); // Get user from localStorage

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      // Filter posts based on user role
      const filteredPosts = user.role === 'admin' ? data : data.filter(post => post.authorId === user.id);
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePostById(id);
      fetchPosts(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`); // Use navigate instead of history.push
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "authorId", headerName: "Author ID", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "content", headerName: "Content", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: "10px" }}
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
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={posts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default PostsManagement;
