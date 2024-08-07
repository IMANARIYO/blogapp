import React, { useEffect, useState } from "react";
import SinglePostModal from "../postspages/SinglePostModal";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { apiPromise, serverurl } from "../../../services/api";
import { getPostById } from "../../../services/postService";
import { getUserId, getUserRole } from "../../../services/userService";

import {
  deleteCommentById,
  getCommentsForPost,
  addCommentToPost,
  updateCommentById,
  getAllComments,
} from "../../../services/commentsService";

const BASE_URL = serverurl || '';

const CommentsManagement = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRoleAndComments = async () => {
      const userRole = getUserRole();
      setRole(userRole);

      if (userRole === 'user' && postId) {
        
        await fetchCommentsForUserPosts();
      } 
      else if (postId) {
        await fetchCommentsForPost(postId);
      } 
      else {
        await fetchAllComments();
      }
    };

    fetchRoleAndComments();
  }, [ postId,role]);

  const fetchCommentsForPost = async (postId) => {
    try {
      const data = await getCommentsForPost(postId);
      setComments(data);
    } catch (error) {
      //console.log("error fetching comments: " + error.message);
    }
  };

  const fetchCommentsForUserPosts = async () => {
    const api = await apiPromise;
    const userId = getUserId();
    try {
      const data = await api.get(`/comments/users/${userId}/posts/comments`);
      setComments(data);
    } catch (error) {
      //console.log("error fetching comments: " + error.message);
    }
  };

  const fetchAllComments = async () => {
    try {
      const data = await getAllComments();
      setComments(data);
    } catch (error) {
      //console.log("error fetching comments: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCommentById(id);
      if (postId) {
        fetchCommentsForPost(postId);
      } else {
        fetchAllComments();
      }
    } catch (error) {
      //console.log("error deleting comment: " + error.message);
    }
  };

  const handleEdit = (comment) => {
    setEditComment(comment);
  };

  const handleEditSave = async () => {
    try {
      await updateCommentById(editComment.id, editComment.content);
      setEditComment(null);
      if (postId) {
        fetchCommentsForPost(postId);
      } else {
        fetchAllComments();
      }
    } catch (error) {
      //console.log("error updating comment: " + error.message);
    }
  };

  const handleAddComment = async () => {
    try {
      if (postId) {
        await addCommentToPost(postId, newCommentContent);
      }
      setNewCommentContent("");
      if (postId) {
        fetchCommentsForPost(postId);
      } else {
        fetchAllComments();
      }
    } catch (error) {
      //console.log("error adding comment: " + error.message);
    }
  };

  const handleViewDetails = async (postId) => {
    try {
      const fetchedPost = await getPostById(postId);
      setSelectedPost(fetchedPost);
      setModalOpen(true);
    } catch (error) {
     console.log('Error fetching post details: ' + error.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "content",
      headerName: "Content",
      width: 300,
      renderCell: (params) => (
        <div style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {params.value}
        </div>
      )
    },
    {
      field: "post",
      headerName: "Post Title",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewDetails(params.row.postId)}
        >
          {params.row.postTitle || "View Post"}
        </Button>
      )
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.value?.profilePicture ? `${BASE_URL}${params.value.profilePicture}` : 'https://via.placeholder.com/50'}
            alt={params.value?.fullNames || 'User'}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
          />
          {params.value?.fullNames || 'Anonymous'}
        </div>
      )
    },
    {
      field: "createdAt",
      headerName: "Creation Date",
      width: 200,
      renderCell: (params) => (
        new Date(params.value).toLocaleDateString() + " " + new Date(params.value).toLocaleTimeString()
      )
    },
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
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditComment({ id: null, content: "" })}
      >
        Add Comment
      </Button>
      <DataGrid
        rows={comments}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      {editComment && (
        <Dialog open={!!editComment} onClose={() => setEditComment(null)}>
          <DialogTitle>{editComment.id ? "Edit Comment" : "Add Comment"}</DialogTitle>
          <DialogContent>
            <TextareaAutosize
              minRows={3}
              placeholder="Comment Content"
              value={editComment.content || newCommentContent}
              onChange={(e) => {
                if (editComment.id) {
                  setEditComment({ ...editComment, content: e.target.value });
                } else {
                  setNewCommentContent(e.target.value);
                }
              }}
              style={{ width: "100%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditComment(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={editComment.id ? handleEditSave : handleAddComment} color="primary">
              {editComment.id ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {selectedPost && (
        <SinglePostModal
          show={modalOpen}
          handleClose={() => setModalOpen(false)}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default CommentsManagement;
