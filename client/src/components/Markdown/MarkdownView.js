import React from "react"
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown"


const MarkdownView = ({body}) => {

  return(
      <Container>
      <ReactMarkdown>{body}</ReactMarkdown>
      </Container>
  )
}

export default MarkdownView