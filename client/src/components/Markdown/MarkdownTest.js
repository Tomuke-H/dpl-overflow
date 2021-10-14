import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownView from "./MarkdownView";


const MarkdownTest = () => {
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return(
    <div>
      <h1>MarkdownTest</h1>
      <Container>
      <h2>Markdown Box</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <MarkdownEditor
          body = {body}
          setBody = {setBody}
          />
        </Form.Group>
        <Button variant="primary" type='submit'>Edit Question</Button>
      </Form>
    </Container>
      <Container>
      <MarkdownView
        body = {body}
      />
      </Container>
    </div>
  )
}

export default MarkdownTest