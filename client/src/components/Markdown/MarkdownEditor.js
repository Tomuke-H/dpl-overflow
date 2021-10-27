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
        1. When adding code to a question or answer, you need to wrap your code in backticks.  If copying and pasting code, you can highlight the code (once pasted) and click the {'</>'} button to automatically insert backticks around your code.
        </Modal.Body>
        <Modal.Body>
        2.  If there is only one line of code, a set of single backticks will suffice.  However, it is recommended that you use triple backticks if your code has any backticks in its content, even if it is only one line.  Otherwise, the backticks in your code content will need to be wrapped in a set of curly brackets and quotes.  In other words, you would need to type {"{'`'}"} instead of just {'`'}.
        </Modal.Body>
        <Modal.Body>
        3. Clicking the {'</>'} button before adding lines of code will insert a set of single backticks. If highlighting code and then clicking the {'</>'} button, the number of backticks inserted will be appropriate for the length of code.  If there is only one line of code, single backticks will be inserted.  If there is more than one line of code, a set of triple backticks will be inserted.
        </Modal.Body>
        <Modal.Body>
        4. If using triple backticks to show your code, you can add a language after the initial set of backticks to display the code differently. Otherwise, the styling for displaying code will be JavaScript.
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