import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { apiMultipartPromise } from '../../../services/api'
import { POST_CATEGORIES, getAllPosts } from '../../../services/postService'

const AddPostModel = ({ show, handleClose }) => {
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
      handleClose() // Close the modal after submission
      // navigate('/');
      // Redirect to home page or another appropriate page
    } catch (error) {
      console.log('Error adding post:', error)
      alert('Failed to add post. Please try again.')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='Enter content'
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value='' disabled>
                Select Category
              </option>
              {POST_CATEGORIES.map(cat =>
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='image'>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type='file'
              onChange={e => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Add Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddPostModel
