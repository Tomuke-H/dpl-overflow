import React, { useState } from "react"
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



const MarkdownView = ({body}) => {

  const [codeOptions, setCodeOptions] = useState(false)
  const [linenumb, setLinenumb] = useState(false)
  const [ darkmode, setDarkMode] = useState(false)

  const CodeBlock = {
    code({node, inline, className, children, ...props}) {
      className = className !== undefined ? className : 'language-js'
      console.log(className)
      const match = /language-(\w+)/.exec(className || '')
      console.log(match)
      return !inline && match ? (
      <SyntaxHighlighter 
        style={darkmode ? coldarkDark : coldarkCold}
        showLineNumbers={linenumb} 
        language={match[1]} 
        PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
  
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  const options = (

    <div style={styles.tinydiv}>
      <p onClick={()=>setLinenumb(!linenumb)} style={styles.ptiny}>{linenumb ? "Hide Line Number":"Show Line Number"}</p>
      <p onClick={()=>setDarkMode(!darkmode)} style={styles.ptiny}>{darkmode ? "Code Light Mode":"Code Dark Mode"}</p>
    </div>
  
  )

  return(
      <Container>
      <ReactMarkdown
      children={body}
      components={CodeBlock}
      />
      <div style={styles.tinydiv}>
      <p onClick={()=>setCodeOptions(!codeOptions)} style={styles.pstealthy}>{codeOptions ? "Hide Code Options":"Show Code Options"}</p>
      {codeOptions ? options : ""}
      </div>
      </Container>
  )
}

const styles = {
  tinydiv: {font: "small-caption", display:"flex", justifyContent:"flex-end"},
  ptiny: {padding: "3px",margin: "3px", border: "1px solid black"},
  pstealthy: {padding: "3px",margin: "3px"}
}


export default MarkdownView
