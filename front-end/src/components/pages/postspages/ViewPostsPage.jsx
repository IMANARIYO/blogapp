import PostCard from "./PostCard";
import React, { useState } from "react";
import SinglePostModal from "./SinglePostModal";

// Sample posts data
const posts = [
  {
    id: 1,
    title: "Post Title 1",
    content: "This is a short description of the first post. The content will be truncated to show only the first few hundred characters.",
    authorName: "Author 1",
    authorImage: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=400",
    image: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=400",
    timePassed: "2 hours ago",
    commentCount: 5
  },
  {
    id: 2,
    title: "Post Title 2",
    content: "This is a short description of the second post. The content will be truncated to show only the first few hundred characters.",
    authorName: "Author 2",
    authorImage: "https://via.placeholder.com/50",
    image: "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=400",
    timePassed: "5 hours ago",
    commentCount: 12
  },
  // Add more dummy posts here if needed
];

const ViewPostsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onOpenModal={() => handleOpenModal(post)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No posts available.</p>
        )}
      </div>

      {/* SinglePostModal component */}
      {selectedPost && (
        <SinglePostModal
          show={modalShow}
          handleClose={handleCloseModal}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default ViewPostsPage;
