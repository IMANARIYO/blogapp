import api from "./api";
import { toast } from "react-toastify";

// Get Comments for a Post
export const getCommentsForPost = async (postId) => {
  try {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch comments: ' + error.response?.data?.error || error.message);
    throw error;
  }
};

// Add Comment to a Post
export const addCommentToPost = async (postId, content) => {
  try {
    const response = await api.post(`/comments/${postId}`, { content });
    toast.success('Comment added successfully');
    return response.data;
  } catch (error) {
    toast.error('Failed to add comment: ' + error.response?.data?.error || error.message);
    throw error;
  }
};

// Get Comment by ID
export const getCommentById = async (commentId) => {
  try {
    const response = await api.get(`/comments/comment/${commentId}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch comment: ' + error.response?.data?.error || error.message);
    throw error;
  }
};

// Update Comment by ID
export const updateCommentById = async (commentId, content) => {
  try {
    const response = await api.put(`/comments/comment/${commentId}`, { content });
    toast.success('Comment updated successfully');
    return response.data;
  } catch (error) {
    toast.error('Failed to update comment: ' + error.response?.data?.error || error.message);
    throw error;
  }
};

// Delete Comment by ID
export const deleteCommentById = async (commentId) => {
  try {
    const response = await api.delete(`/comments/comment/${commentId}`);
    toast.success('Comment deleted successfully');
    return response.data;
  } catch (error) {
    toast.error('Failed to delete comment: ' + error.response?.data?.error || error.message);
    throw error;
  }
};
