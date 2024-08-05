import React from "react";
import { serverurl } from "../../../services/api";

const EditPostPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await api.get(`/posts/${id}`);
          setPost(response.data.data);
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
          setCategory(response.data.data.category);
        } catch (error) {
          console.error('Failed to fetch post:', error);
        }
      };
      fetchPost();
    }, [id]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (image) formData.append('image', image);
  
      try {
        await apiMultipart.patch(`/posts/${id}`, formData);
        alert('Post updated successfully!');
        history.push('/posts'); // Redirect to post list page
      } catch (error) {
        console.error('Error updating post:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select Category</option>
          {POST_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update Post</button>
      </form>
    );
  };

export default EditPostPage
