import React from "react";
import { Modal, Button } from "react-bootstrap";
import CreateTag from "./CreateTag";

const NewTagModal = ({tags, setTags, showTagModal, setShowTagModal}) => {
  const handleClose = () => setShowTagModal(false)
  return (
    <Modal 
      show={showTagModal}  
      onHide={handleClose}
    >
      <Modal.Header>New Tag</Modal.Header>
      <Modal.Body>
        <CreateTag tags={tags} setTags={setTags} setShowTagModal={setShowTagModal}/>
      </Modal.Body>
    </Modal>
  )
}

export default NewTagModal;