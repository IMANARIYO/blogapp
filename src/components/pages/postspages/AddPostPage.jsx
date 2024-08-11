import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiMultipartPromise } from "../../../services/api";
import { POST_CATEGORIES, getAllPosts } from "../../../services/postService";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material'

const AddPostPage = ({ onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)
    if (image) formData.append('image', image)

    try {
      const apiMultipart = await apiMultipartPromise
      await apiMultipart.post('/posts', formData)
      getAllPosts()
      navigate('/') // Redirect to home page or another appropriate page
    } catch (error) {
      console.log('Error adding post:', error)
      alert('Failed to add post. Please try again.')
    }
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography component='h1' variant='h5' gutterBottom>
          Add New Post
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='title'
            label='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='content'
            label='Content'
            multiline
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='category'
            label='Category'
            select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <MenuItem value='' disabled>
              Select Category
            </MenuItem>
            {POST_CATEGORIES.map(cat =>
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            )}
          </TextField>
          <Box sx={{ mt: 2 }}>
            <Button variant='contained' component='label'>
              Upload Image
              <input
                type='file'
                hidden
                onChange={e => setImage(e.target.files[0])}
              />
            </Button>
          </Box>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
          >
            Add Post
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AddPostPage
