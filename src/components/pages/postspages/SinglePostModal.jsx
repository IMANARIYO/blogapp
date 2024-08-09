import LoginModal from "./LoginModal";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { serverurl } from "../../../services/api";
import { addCommentToPost, getAllComments, getCommentsForPost } from "../../../services/commentsService";
import { default_comments } from "../../../services/constants/comments";
import { getUserFromLocalStorage } from "../../../services/userService";

const BASE_URL = serverurl ; 

const SinglePostModal = ({ show, handleClose, post,updateCommentsInPost  }) => {

  const filteredDefaultComments = default_comments.filter(comment => comment.postId === post?.id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (post && show) {
      fetchComments();
    }
  }, [post, show]); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const fetchComments = async () => {
    try {
      const data = await getCommentsForPost(post.id);
      
      
      if (Array.isArray(data)) {
        setComments(data);
    
      }
      else{
       
        setComments(filteredDefaultComments);
      }
    } catch (error) {
   
      console.log("Failed to fetch comments:", error); 
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      let user = getUserFromLocalStorage();

      if (!user) {
        setLoginModalOpen(true); // Open login modal if user is not logged in
        return;
      } else {
        setUser(user);
      }
    }

    if (newComment.trim()) {
      try {
      
        const addedComment = await addCommentToPost(post.id, newComment);
        
        setNewComment('');
        // Optimistically update the comments and comment count
        const updatedComments = [...comments, {
          id: addedComment.id,
          content: newComment,
          createdAt: new Date().toISOString(),
          user: { ...user, fullNames: user.fullNames, profilePicture: user.profilePicture }
        }];
        setComments(updatedComments);
        updateCommentsInPost(post.id, updatedComments); 
        setNewComment('');
        fetchComments();
      } catch (error) {
        console.log("Failed to add comment:", error); // Log any errors
      }
    }
  };

  const constructImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
console.log("imagePath now is",imagePath);
    return `${BASE_URL}${imagePath}`;
  };


  const imageUrl = constructImageUrl(post?.image);

  return (
    <>
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
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6" id="modal-title">
              {post?.title}
            </Typography>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </div>
          <div style={{
            padding: '20px',
            overflowY: 'auto',
            flexGrow: 1,
          }}>
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
                  <div key={comment.id} className="border border-gray-300 p-3 mb-3 rounded-lg shadow-sm"
                  style={{ 
                    maxWidth: '100%', 
                    overflowX: 'hidden', 
                    overflowY: 'auto',
                    wordWrap: 'break-word'
                  }}>
                    <div className="flex items-start mb-2">
                      <img
                        className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200"
                        src={comment.user?.profilePicture ? `${BASE_URL}${comment.user.profilePicture}` : 'https://via.placeholder.com/50'}
                        alt={comment.user?.fullNames || 'User'}
                      />
                      <div>
                        <strong className="text-gray-800">{comment.user?.fullNames || 'Anonymous'}</strong>
                        <span className="block text-gray-500 text-xs">
                          {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line"
                    style={{
                      wordWrap: 'break-word'
                    }}>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <LoginModal
        open={loginModalOpen}
        handleClose={() => setLoginModalOpen(false)}
        onLoginSuccess={() => {
          setLoginModalOpen(false);
          fetchComments(); // Refresh comments if needed after login
        }}
      />
    </>
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
