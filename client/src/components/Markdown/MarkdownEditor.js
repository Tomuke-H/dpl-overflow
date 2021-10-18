import React, {  } from "react"
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({body,setBody}) => {


  return(
    <div>
      <p style={styles.pstealthy}>If adding code,{"</>"} button, you can state a language at the end of the initial triple back ticks to have it render in that language, otherwise the default formatting is for Javascript.</p>
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