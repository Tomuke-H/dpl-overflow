import React, {  } from "react"
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({body,setBody}) => {


  return(
    <div>
      <p style={styles.pstealthy}>When adding code, use the {"</>"} button and type your code in between the ticks to format your code into a code block. You can state a language at the end of the initial back ticks to have it render in that language. Otherwise, the default language is Javascript.</p>
      <MDEditor
      value={body}
      onChange={setBody}
      />
    </div>
  )
}

const styles = {
  pstealthy: {padding: "3px",margin: "3px", fontSize:"smaller"}
}

export default MarkdownEditor