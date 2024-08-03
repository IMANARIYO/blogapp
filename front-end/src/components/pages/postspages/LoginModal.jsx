import LoginPage from "./LoginPage";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const LoginModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginPage />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
