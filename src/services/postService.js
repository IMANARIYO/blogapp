import { toast } from "react-toastify";
import { apiPromise } from "./api";

export const POST_CATEGORIES = [
  'Technology',
  'Health',
  'Finance',
  'Education',
  'Entertainment',
  'Sports',
  'Lifestyle',
  'Travel'
];

// Get All Posts
export const getAllPosts = async () => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
   console.log('Failed to fetch posts: ' + error.response?.data?.error || error.message);
     
  }
};
// Get All Posts
export const getAllMyPosts = async () => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get('/posts/myposts');
    return response.data;
  } catch (error) {
   console.log('Failed to fetch posts: ' + error.response?.data?.error || error.message);
     
  }
};

// Create Post
const isValidCategory = (category) => POST_CATEGORIES.includes(category);

export const createPost = async (req, res) => {
  const { title, content, authorId, image, category } = req.body;

  if (!isValidCategory(category)) {
    return res.status(400).json({ success: false, error: 'Invalid category' });
  }

  try {
    const newPost = await Post.create({ title, content, authorId, image, category });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Get Post by ID
export const getPostById = async (postId) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
   console.log('Failed to fetch post: ' + error.response?.data?.error || error.message);
     
  }
};

// Update Post by ID
export const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, image } = req.body;

  if (!isValidCategory(category)) {
    return res.status(400).json({ success: false, error: 'Invalid category' });
  }

  try {
    const [updated] = await Post.update({ title, content, category, image }, { where: { id } });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    const updatedPost = await Post.findByPk(id);
    res.status(200).json({ success: true, data: updatedPost });
    getAllPosts();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Delete Post by ID
export const deletePostById = async (postId) => {
  const api = await apiPromise; // Await the initialized API instance
  try {
    const response = await api.delete(`/posts/${postId}`);
    getAllPosts();
    toast.success('Post deleted successfully');
    return response.data;
  } catch (error) {
   console.log('Failed to delete post: ' + error.response?.data?.error || error.message);
     
  }
};
