import React, { useState } from "react"
import { Button, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';



const MarkdownView = ({body}) => {

  const [linenumb, setLinenumb] = useState(false)

  const CodeBlock = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
      <SyntaxHighlighter 
        style={vs}
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

  return(
      <Container>
      <ReactMarkdown
      children={body}
      components={CodeBlock}
      />
      <Button onClick={()=>setLinenumb(!linenumb)}>{linenumb ? "Hide Line Number":"Show Line Number"}</Button>
      </Container>
  )
}



export default MarkdownView
