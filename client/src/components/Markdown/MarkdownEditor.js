import React, {  } from "react"
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({body,setBody}) => {


  return(
    <div>
      <MDEditor
      value={body}
      onChange={setBody}
      />
    </div>
  )
}

export default MarkdownEditor