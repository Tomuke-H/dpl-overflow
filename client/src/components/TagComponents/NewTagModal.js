import React from "react";
import { Modal, Button } from "react-bootstrap";
import { DPLButton } from "../DPLButtons";
import CreateTag from "./CreateTag";

const NewTagModal = ({tags, setTags, selectedValues, setSelectedValues, showTagModal, setShowTagModal, checkedItems, setCheckedItems}) => {
  const handleClose = () => setShowTagModal(false)
  return (
    <Modal 
      show={showTagModal}  
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <h2>Create New Tag</h2>
      </Modal.Header>
      <Modal.Body>
        Try to keep tags short and concise to convey the most amount of meaning in a word or two.
      </Modal.Body>
      <Modal.Body>
        <CreateTag handleClose={handleClose} tags={tags} setTags={setTags} selectedValues={selectedValues} setSelectedValues={setSelectedValues} setShowTagModal={setShowTagModal} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>
      </Modal.Body>
    </Modal>
  )
}

export default NewTagModal;