import React, { useState } from 'react'
import { api } from './api'

const CommentModal = ({ show, handleClose, postId, onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await api.post(`/posts/${postId}/comments`, {
        content: commentContent,
        authorId: 1
      }) // Replace `1` with the actual user ID
      onCommentAdded() // Notify parent component to refresh comments
      setCommentContent('')
      handleClose()
    } catch (error) {
      console.log('Error adding comment:', error)
    }
  }

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabindex='-1'
      aria-labelledby='addCommentModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='addCommentModalLabel'>
              Add Comment
            </h5>
            <button
              type='button'
              className='btn-close'
              onClick={handleClose}
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <textarea
                  className='form-control'
                  rows='4'
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  placeholder='Write your comment here...'
                  required
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Add Comment
              </button>
              <button
                type='button'
                className='btn btn-secondary ms-2'
                onClick={handleClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentModal
