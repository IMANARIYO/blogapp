import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "./api";
import { POST_CATEGORIES } from "./constants/categories";

const BASE_URL = 'http://localhost:4444';
const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts'); // Adjust endpoint
        setPosts(response.data.data);
        setFilteredPosts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (categoryFilter) {
      setFilteredPosts(posts.filter(post => post.category === categoryFilter));
    } else {
      setFilteredPosts(posts);
    }
  }, [categoryFilter, posts]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'content', headerName: 'Content', width: 300 },
    { field: 'authorId', headerName: 'Author ID', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value} alt="Post" style={{ width: '100px' }} /> },
    // Add actions like edit and delete here
  ];

  return (
    <div>
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ marginBottom: '10px' }}>
        <option value="">All Categories</option>
        {POST_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={filteredPosts} columns={columns} pageSize={10} loading={loading} />
      </div>
    </div>
  );
};

export default PostListPage;
