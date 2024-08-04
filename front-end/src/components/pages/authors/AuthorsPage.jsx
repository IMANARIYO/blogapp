import AuthorCard from "./UserCard";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userService";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const users = data.data; // Adjust based on the actual structure of your API response

        // Transforming the user data to fit the AuthorCard props
        const transformedAuthors = users.map(user => ({
          name: user.fullNames,
          posts: user.posts.length,
          profileImage: `http://localhost:4444${user.profilePicture}` // Adjust the URL if needed
        }));
        
        setAuthors(transformedAuthors);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Authors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {authors.map((author, index) => (
          <AuthorCard key={index} author={author} />
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
