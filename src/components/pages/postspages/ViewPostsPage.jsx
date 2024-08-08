import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
import SinglePostModal from "./SinglePostModal";
import { useLocation } from "react-router-dom";
import { apiPromise } from "../../../services/api";
import { DEFAULT_POSTS } from "../../../services/constants/posts";

const POSTS_PER_PAGE = 10
// Default posts da

const ViewPostsPage = () => {
  const [posts, setPosts] = useState(Array.isArray(DEFAULT_POSTS) ? DEFAULT_POSTS : []); 
  const [allPosts, setAllPosts] = useState(Array.isArray(DEFAULT_POSTS) ? DEFAULT_POSTS : []); 
  const [modalShow, setModalShow] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const authorId = query.get('authorId')
  const selectedCategory = query.get('category');
  const fetchAllPosts = async () => {
    setLoading(false)
    try {
      const api = await apiPromise;
      const response = await api.get(`/posts?start=0&limit=${POSTS_PER_PAGE}`)
      const fetchedPosts =Array.isArray(response.data) ? response.data : []; 
if(fetchedPosts.length>0){
  setAllPosts(fetchedPosts)
  setPosts(fetchedPosts)
}else{
  
  setAllPosts(DEFAULT_POSTS)
  setPosts(DEFAULT_POSTS)
  console.log("________________________________________ ")
}
      setHasMore(fetchedPosts.length === POSTS_PER_PAGE)
    } catch (error) {
      console.log("No posts fetched, using default posts.",error.message);
      setAllPosts(DEFAULT_POSTS)
     setPosts(DEFAULT_POSTS)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filteredPosts = allPosts

    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(
        post => post.category === selectedCategory
      )
    }

    if (authorId) {
      filteredPosts = filteredPosts.filter(post => post.authorId == authorId)
    }

    setPosts(filteredPosts)
  }

  useEffect(() => {
    fetchAllPosts()
  }, [])

  useEffect(
    () => {
      filterPosts()
    },
    [selectedCategory, authorId, allPosts]
  )

  const handleOpenModal = post => {
    setSelectedPost(post)
    setModalShow(true)
  }

  const handleCloseModal = () => {
    setModalShow(false)
    setSelectedPost(null)
  }

  const loadMorePosts = () => {
    if (hasMore) {
      fetchAllPosts()
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-6 text-gray-800'>
        {selectedCategory
          ? `Posts in ${selectedCategory}`
          : authorId ? "Author's Posts" : 'All Posts'}
      </h1>
      <div className='flex flex-col items-center'>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={
            loading
              ? <h4 className='text-center'>Loading more posts...</h4>
              : null
          }
          endMessage={
            <p className='text-center text-gray-500'>No more posts to show.</p>
          }
        >
          <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 mdl:grid-cols-2 lg:grid-cols-3 lgl:grid-cols-3 xl:grid-cols-4 gap-6'>
            {posts.map(post =>
              <PostCard
                key={post.id}
                post={post}
                onOpenModal={() => handleOpenModal(post)}
              />
            )}
          </div>
        </InfiniteScroll>
      </div>

      {selectedPost &&
        <SinglePostModal
          show={modalShow}
          handleClose={handleCloseModal}
          post={selectedPost}
        />}
    </div>
  )
}

export default ViewPostsPage
