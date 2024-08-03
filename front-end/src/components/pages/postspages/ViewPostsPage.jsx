import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import React, { useState } from "react";
import SinglePostModal from "./SinglePostModal";

// Dummy posts data
const posts = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Post Title ${index + 1}`,
  content: `This is a short description of post number ${index + 1}. The content will be truncated to show only the first few hundred characters.`,
  authorName: `Author ${index + 1}`,
  authorImage: "https://via.placeholder.com/50",
  image: "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=400",
  timePassed: `${Math.floor(Math.random() * 7) + 1} days ago`,
  commentCount: Math.floor(Math.random() * 20) + 1
}));

const POSTS_PER_PAGE = 10; // Number of posts to load per scroll

const ViewPostsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedPost(null);
  };

  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, posts.length));
  };

  return (
    <div className=" p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Posts</h1>
      <div className="">
        <InfiniteScroll
          dataLength={visiblePosts}
          next={loadMorePosts}
          hasMore={visiblePosts < posts.length}
          loader={<h4 className="text-center">Loading more posts...</h4>}
          endMessage={<p className="text-center text-gray-500">No more posts to show.</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.slice(0, visiblePosts).map(post => (
              <PostCard
                key={post.id}
                post={post}
                onOpenModal={() => handleOpenModal(post)}
              />
            ))}
          </div>
        </InfiniteScroll>
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
