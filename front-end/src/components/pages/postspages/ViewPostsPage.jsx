import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
import SinglePostModal from "./SinglePostModal";
import api from "../../../services/api";
import { useLocation } from "react-router-dom";

const POSTS_PER_PAGE = 10;

const ViewPostsPage = ({ selectedCategory }) => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const authorId = query.get('authorId');

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

  const filterPosts = () => {
    let filteredPosts = allPosts;
    
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }
    
    if (authorId) {
      filteredPosts = filteredPosts.filter(post => post.authorId === parseInt(authorId, 10));
    }
    
    setPosts(filteredPosts);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [selectedCategory, authorId, allPosts]);

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
        {selectedCategory ? `Posts in ${selectedCategory}` : authorId ? 'Author\'s Posts' : 'All Posts'}
      </h1>
      <div className="flex flex-col items-center">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={loading ? <h4 className="text-center">Loading more posts...</h4> : null}
          endMessage={<p className="text-center text-gray-500">No more posts to show.</p>}
        >
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 mdl:grid-cols-2 lg:grid-cols-3 lgl:grid-cols-3 xl:grid-cols-3 gap-6">
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
