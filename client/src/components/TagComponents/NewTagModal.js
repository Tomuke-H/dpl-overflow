import React from "react";
import { Modal, Button } from "react-bootstrap";
import CreateTag from "./CreateTag";

const NewTagModal = ({checkedItems, setCheckedItems, showTagModal, setShowTagModal}) => {
  const handleClose = () => setShowTagModal(false)
  return (
    <Modal 
      show={showTagModal}  
      onHide={handleClose}
    >
      <Modal.Header>New Tag</Modal.Header>
      <Modal.Body>
        <CreateTag checkedItems={checkedItems} setCheckedItems={setCheckedItems} setShowTagModal={setShowTagModal}/>
      </Modal.Body>
    </Modal>
  )
}

export default NewTagModal;