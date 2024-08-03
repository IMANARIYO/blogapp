import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { sampleComments } from "./samplePosts";

const SinglePostModal = ({ show, handleClose, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (post) {
      // Fetch comments for the post from dummy data
      setComments(sampleComments[post.id] || []);
    }
  }, [post, show]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(), // Unique id for the new comment
        author: {
          name: "Current User", // Replace with actual user data
          profileImage: "https://via.placeholder.com/50", // Replace with actual user data
        },
        content: newComment,
        createdAt: new Date().toISOString(),
      };

      setComments([...comments, newCommentData]);
      setNewComment("");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static" // Prevent closing by clicking on the backdrop
      scrollable // Allows scrolling if content overflows
      centered // Center the modal vertically
    >
      <Modal.Header closeButton>
        <Modal.Title>{post?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          {post?.image && (
            <img
              className="w-full mb-4 rounded-lg"
              src={post.image}
              alt={post.title}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p className="text-gray-700">{post?.content}</p>
          
          {/* Add Comment Form */}
          <div className="mt-4">
            <h5 className="text-lg font-semibold mb-2">Add a Comment:</h5>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="4"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Type your comment here..."
              />
              <Button
                type="submit"
                variant="primary"
                className="mt-2 w-full py-2"
                disabled={!newComment.trim()}
              >
                Submit
              </Button>
            </form>
          </div>

          {/* List Comments */}
          <div className="mt-4">
            <h5 className="text-lg font-semibold mb-2">Comments:</h5>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="border border-gray-300 p-3 mb-3 rounded-lg shadow-sm">
                  <div className="flex items-start mb-2">
                    <img
                      className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200"
                      src={comment.author.profileImage}
                      alt={comment.author.name}
                    />
                    <div>
                      <strong className="text-gray-800">{comment.author.name}</strong>
                      <span className="block text-gray-500 text-xs">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SinglePostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default SinglePostModal;
