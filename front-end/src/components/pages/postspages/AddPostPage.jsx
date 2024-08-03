import React from "react";

const AddPostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (image) formData.append('image', image);
  
      try {
        await apiMultipart.post('/posts', formData);
        alert('Post added successfully!');
      } catch (error) {
        console.error('Error adding post:', error);
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
          <button type="submit">Add Post</button>
        </form>
      );
}

export default AddPostPage
