import AddPostModel from '../postspages/AddPostModel'
import AddPostPage from '../postspages/AddPostPage'
import EditPostPage from '../postspages/EditPostPage'
import React, { useEffect, useState } from 'react'
import SinglePostModal from '../postspages/SinglePostModal'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deletePostById, getAllPosts } from '../../../services/postService'
import { getUserFromLocalStorage } from '../../../services/userService'

const PostsManagement = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [addPostOpen, setAddPostOpen] = useState(false)
  const [editPostOpen, setEditPostOpen] = useState(false)
  const [viewPostDetailsOpen, setViewPostDetailsOpen] = useState(false)
  const user = getUserFromLocalStorage()

  useEffect(
    () => {
      const fetchPosts = async () => {
        try {
          const data = await getAllPosts()
          const filteredPosts =
            user.role === 'admin'
              ? data
              : data.filter(post => post.authorId === user.id)
          setPosts(filteredPosts)
        } catch (error) {
          console.log('Failed to fetch posts:', error)
          console.log('Failed to load posts.')
        }
      }
      fetchPosts()
    },
    [user.role, user.id]
  )

  const handleDeletePost = async postId => {
    try {
      await deletePostById(postId)
      setPosts(posts.filter(post => post.id !== postId))
      // toast.success('Post deleted successfully!');
    } catch (error) {
      console.log('Failed to delete post:', error)
      console.log('Failed to delete post.')
    }
  }

  const handleViewDetails = post => {
    setSelectedPost(post)
    setViewPostDetailsOpen(true)
  }
  const handleEditClick = post => {
    setSelectedPost(post)
    setEditPostOpen(true)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'createdAt', headerName: 'createdAt', width: 180 },
    { field: 'updatedAt', headerName: 'updatedAt', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: params =>
        <div>
          <Button
            onClick={() => handleViewDetails(params.row)}
            variant='contained'
            color='info'
            size='small'
            style={{ marginRight: '8px' }}
          >
            View Details
          </Button>
          <Button
            onClick={() => {
              handleEditClick(params.row)
              setEditPostOpen(true)
            }}
            variant='contained'
            color='primary'
            size='small'
            style={{ marginRight: '8px' }}
          >
            Edit it
          </Button>
          <Button
            onClick={() => handleDeletePost(params.row.id)}
            variant='contained'
            color='secondary'
            size='small'
          >
            Delete
          </Button>
        </div>
    }
  ]

  return (
    <div>
      <Button variant='contained' onClick={() => setAddPostOpen(true)}>
        Add Post
      </Button>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={posts} columns={columns} pageSize={10} />
      </div>
      {addPostOpen &&
        <AddPostModel
          show={addPostOpen}
          handleClose={() => setAddPostOpen(false)}
        />}

      {editPostOpen &&
        selectedPost &&
        <EditPostPage
          post={selectedPost}
          show={editPostOpen}
          onClose={() => setEditPostOpen(false)}
        />}
      {viewPostDetailsOpen &&
        selectedPost &&
        <SinglePostModal
          show={viewPostDetailsOpen}
          handleClose={() => setViewPostDetailsOpen(false)}
          post={selectedPost}
        />}
    </div>
  )
}

export default PostsManagement
