import React from "react";
import { Modal } from "react-bootstrap";
import { DPLButton } from "../DPLButtons";

const FirstQuestionModal = ({showModal, setShowModal}) => {
  const handleClose = () => setShowModal(false)
  return (
    <Modal 
      show={showModal}  
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Asking Good Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Welcome to the DPL community! Asking questions is the best way to learn, and people are here to help! In order to help you get started on the right foot, here are a couple pointers:
        
      </Modal.Body>
      <Modal.Body>
        1. Before you ask a new question, check to see if your question hasn't <a href='/dashboard' target='_blank'>already been answered.</a>
        <br/>
        2. Briefly summarize the issue you're running into.
        <br/>
        3. Show some code to better help those trying to answer. To help format code snippets, wrap code in three backticks on each side. 
        <br />i.e.:  ``` yourCodeHere ```
      </Modal.Body>
      <Modal.Footer>
        <DPLButton onClick={handleClose}>Close</DPLButton>
      </Modal.Footer>
    </Modal>
  )
}

export default FirstQuestionModal