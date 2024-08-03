import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  Typography,
} from "@mui/material";

// Base URL for images
const BASE_URL = 'http://localhost:4444'; // Replace with your actual base URL

const SinglePostModal = ({ show, handleClose, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (post) {
      // Fetch comments for the post from the post object
      setComments(post.comments || []);
    }
  }, [post, show]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      // Here you would call your API to post the comment
      const newCommentData = {
        id: Date.now(), // Unique id for the new comment
        author: {
          name: 'Current User', // Replace with actual user data
          profileImage: 'https://via.placeholder.com/50', // Replace with actual user data
        },
        content: newComment,
        createdAt: new Date().toISOString(),
      };

      // Update state with the new comment (simulating API call)
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  const imageUrl = post?.image ? `${BASE_URL}${post.image}` : null;

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '80%', 
        maxWidth: '800px', 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      }}>
        <Typography variant="h6" id="modal-title">
          {post?.title}
        </Typography>
        <div className="flex flex-col mt-4">
          {imageUrl && (
            <img
              className="w-full mb-4 rounded-lg"
              src={imageUrl}
              alt={post.title}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p className="text-gray-700 whitespace-pre-line">{post?.content}</p>
          
          <div className="mt-4">
            <h5 className="text-lg font-semibold mb-2">Add a Comment:</h5>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="4"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Type your comment here..."
                style={{ resize: 'vertical' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-2 w-full py-2"
                disabled={!newComment.trim()}
              >
                Submit
              </Button>
            </form>
          </div>

          <div className="mt-4">
            <h5 className="text-lg font-semibold mb-2">
              Comments ({comments.length}):
            </h5>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="border border-gray-300 p-3 mb-3 rounded-lg shadow-sm">
                  <div className="flex items-start mb-2">
                    <img
                      className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200"
                      src={comment.user.profilePicture}
                      alt={comment.user.fullNames}
                    />
                    <div>
                      <strong className="text-gray-800">{comment.user.fullNames}</strong>
                      <span className="block text-gray-500 text-xs">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
        <Button 
          variant="outlined" 
          onClick={handleClose} 
          style={{ marginTop: '20px' }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

SinglePostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        user: PropTypes.shape({
          id: PropTypes.number,
          fullNames: PropTypes.string,
          profilePicture: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

export default SinglePostModal;
