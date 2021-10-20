import React from "react";
import { Modal, Button } from "react-bootstrap";
import CreateTag from "./CreateTag";

const NewTagModal = ({tags, setTags, selectedValues, setSelectedValues, showTagModal, setShowTagModal, checkedItems, setCheckedItems}) => {
  const handleClose = () => setShowTagModal(false)
  return (
    <Modal 
      show={showTagModal}  
      onHide={handleClose}
    >
      <Modal.Header>New Tag</Modal.Header>
      <Modal.Body>
        <CreateTag tags={tags} setTags={setTags} selectedValues={selectedValues} setSelectedValues={setSelectedValues} setShowTagModal={setShowTagModal} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>
      </Modal.Body>
    </Modal>
  )
}

export default NewTagModal;