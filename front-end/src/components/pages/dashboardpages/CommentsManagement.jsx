import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

import {
  deleteCommentById,
  getCommentsForPost,
  addCommentToPost,
  updateCommentById,
} from "../../../services/commentsService";

const CommentsManagement = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const data = await getCommentsForPost(postId);
      setComments(data);
    } catch (error) {
      toast.error("Error fetching comments: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCommentById(id);
      fetchComments(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Error deleting comment: " + error.message);
    }
  };

  const handleEdit = (comment) => {
    setEditComment(comment);
  };

  const handleEditSave = async () => {
    try {
      await updateCommentById(editComment.id, editComment.content);
      setEditComment(null);
      fetchComments();
    } catch (error) {
      toast.error("Error updating comment: " + error.message);
    }
  };

  const handleAddComment = async () => {
    try {
      await addCommentToPost(postId, newCommentContent);
      setNewCommentContent("");
      fetchComments();
    } catch (error) {
      toast.error("Error adding comment: " + error.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "postId", headerName: "Post ID", width: 150 },
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
    <div style={{ height: 400, width: "100%" }}>
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
    </div>
  );
};

export default CommentsManagement;
