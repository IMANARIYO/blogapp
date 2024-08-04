import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
import SinglePostModal from "./SinglePostModal";
import api from "../../../services/api";

const POSTS_PER_PAGE = 10;

const ViewPostsPage = ({ selectedCategory }) => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/posts?start=0&limit=${POSTS_PER_PAGE}`);
      const fetchedPosts = response.data;

      setAllPosts(fetchedPosts);
      setPosts(fetchedPosts);
      setHasMore(fetchedPosts.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPostsByCategory = () => {
    if (selectedCategory) {
      const filteredPosts = allPosts.filter(post => post.category === selectedCategory);
      setPosts(filteredPosts);
    } else {
      setPosts(allPosts);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    filterPostsByCategory();
  }, [selectedCategory, allPosts]);

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
      fetchAllPosts();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        {selectedCategory ? `Posts in ${selectedCategory}` : 'All Posts'}
      </h1>
      <div className="flex flex-col items-center">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={loading ? <h4 className="text-center">Loading more posts...</h4> : null}
          endMessage={<p className="text-center text-gray-500">No more posts to show.</p>}
        >
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-2 lgl:grid-cols-4 xl:grid-cols-4 gap-6 justify-between">
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
