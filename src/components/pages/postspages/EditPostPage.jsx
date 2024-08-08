import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { apiMultipartPromise, apiPromise } from '../../../services/api'
import { POST_CATEGORIES } from '../../../services/postService'

const EditPostPage = ({ show, onClose, post }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(post.title || '')
  const [content, setContent] = useState(post.content || '')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(post.category || '')
  const [error, setError] = useState('') // State for error messages
  const [loading, setLoading] = useState(false) // State for loading status

  useEffect(
    () => {
      if (post.id) {
        const fetchPost = async () => {
          const api = await apiPromise
          try {
            const response = await api.get(`/posts/${post.id}`)
            setTitle(response.data.title)
            setContent(response.data.content)
            setCategory(response.data.category)
          } catch (error) {
            console.log('Failed to fetch post:', error)
            setError('Failed to fetch post details.')
          }
        }
        fetchPost()
      }
    },
    [post]
  )

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('') // Reset error state

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)
    if (image) formData.append('image', image)

    try {
      const apiMultipart = await apiMultipartPromise
      await apiMultipart.put(`/posts/${post.id}`, formData)
      alert('Post updated successfully!')
      onClose() // Close the modal
      navigate('/posts') // Redirect to post list page
    } catch (error) {
      console.log('Error updating post:', error)
      if (error.response) {
        // Handle server errors
        setError(
          error.response.data.message ||
            'An error occurred while updating the post.'
        )
      } else {
        // Handle network errors or unexpected errors
        setError('Network error. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error &&
          <Alert variant='danger'>
            {error}
          </Alert>}{' '}
        {/* Display error message */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Title'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formContent'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder='Content'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formCategory'>
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
          <Form.Group className='mb-3' controlId='formImage'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              onChange={e => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Button variant='secondary' onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button
            variant='primary'
            type='submit'
            className='ms-2'
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Post'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditPostPage
