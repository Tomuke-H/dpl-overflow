import React, { useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { Modal } from "react-bootstrap";
import { DPLButton } from "../DPLButtons";

const MarkdownEditor = ({body,setBody}) => {
  const [showHelp, setShowHelp] = useState(false)

  const helpCode =() => {
    return(
      <Modal show={showHelp} onHide={()=>setShowHelp(!showHelp)}>
        <Modal.Header closeButton>
          <Modal.Title>Code Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        1. When adding code, using the {'</>'} button can help quickly stick code you have pasted into a code block.
        </Modal.Body>
        <Modal.Body>
        2. Back ticks that are provided by the {'</>'} button is proportional to the number of lines of code that is highlighted. If pushing the button before adding lines of code expect to see one set of back ticks. If there are more than one line of code, three set of backticks will be seen.
        </Modal.Body>
        <Modal.Body>
        3. It is recommended that if your code has any backticks in its content, even if it is one line, to use triple backticks.
        </Modal.Body>
        <Modal.Body>
        4. If using three backticks to show your code, you can add a language after the initial set of backticks to display the code differently. Default styling for displaying code otherwise will be JavaScript.
        </Modal.Body>
        <Modal.Footer>
          <DPLButton onClick={()=>setShowHelp(!showHelp)}>
            Close
          </DPLButton>
        </Modal.Footer>
      </Modal>
    )
  }
  return(
    <div>
      <p style={styles.pstealthy} onClick={()=>setShowHelp(!showHelp)}>Click here for more information on how to type code.</p>
      {showHelp && helpCode()}
      <MDEditor
      value={body}
      onChange={setBody}
      />
    </div>
  )
}

const styles = {
  pstealthy: {padding: "3px",margin: "3px", fontSize:"smaller", textAlign:"right"}
}

export default MarkdownEditor