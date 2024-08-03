import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
import SinglePostModal from "./SinglePostModal";
import api from "../../../services/api";

const POSTS_PER_PAGE = 10; // Number of posts to load per scroll

const ViewPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [hasMore, setHasMore] = useState(true); // To check if there are more posts to load
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch posts from API
  const fetchPosts = async (start = 0, limit = POSTS_PER_PAGE) => {
    setLoading(true);
    try {
      const response = await api.get(`/posts?start=${start}&limit=${limit}`);
      const fetchedPosts = response.data;
      
      if (fetchedPosts.length < limit) {
        setHasMore(false); // No more posts to load
      }

      setPosts(prev => [...prev, ...fetchedPosts]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0, POSTS_PER_PAGE); // Initial fetch
  }, []);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedPost(null);
  };

  const loadMorePosts = () => {
    if (hasMore) {
      fetchPosts(posts.length, POSTS_PER_PAGE); // Fetch more posts
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Posts</h1>
      <div className="flex flex-col items-center">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={loading ? <h4 className="text-center">Loading more posts...</h4> : null}
          endMessage={<p className="text-center text-gray-500">No more posts to show.</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {posts.map(post => (
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
