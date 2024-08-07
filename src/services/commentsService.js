import { toast } from "react-toastify";
import { apiPromise } from "./api";

// Get Comments for a Post
export const getCommentsForPost = async (postId) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get(`/comments/${postId}`);
    console.log("in here iwas betraying-------------------------------------",response.data);
    return response.data;
  } catch (error) {
    console.log('Failed to fetch comments: ' + error.response?.data?.error || error.message);
     
  }
};

// Get All Comments
export const getAllComments = async () => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get('/comments'); // Adjust the endpoint based on your API
    return response.data;
  } catch (error) {
    console.log('Failed to fetch comments: ' + error.response?.data?.error || error.message);
     
  }
};

// Add Comment to a Post
export const addCommentToPost = async (postId, content) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.post(`/comments/${postId}`, { content });
    toast.success('Comment added successfully');
    return response.data;
  } catch (error) {
   console.log('Failed to add comment: ' + error.response?.data?.error || error.message);
     
  }
};

// Get All Comments for All Posts of a Specific User
export const getCommentsForUserPosts = async (userId) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get(`/comments/users/${userId}/posts/comments`);
    return response.data;
  } catch (error) {
   console.log('Failed to fetch comments for user posts: ' + error.response?.data?.error || error.message);
     
  }
};

// Get Comment by ID
export const getCommentById = async (commentId) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get(`/comments/comment/${commentId}`);
    return response.data;
  } catch (error) {
   console.log('Failed to fetch comment: ' + error.response?.data?.error || error.message);
     
  }
};

// Update Comment by ID
export const updateCommentById = async (commentId, content) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.put(`/comments/comment/${commentId}`, { content });
    toast.success('Comment updated successfully');
    return response.data;
  } catch (error) {
   console.log('Failed to update comment: ' + error.response?.data?.error || error.message);
     
  }
};

// Delete Comment by ID
export const deleteCommentById = async (commentId) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.delete(`/comments/comment/${commentId}`);
    toast.success('Comment deleted successfully');
    return response.data;
  } catch (error) {
   console.log('Failed to delete comment: ' + error.response?.data?.error || error.message);
     
  }
};
