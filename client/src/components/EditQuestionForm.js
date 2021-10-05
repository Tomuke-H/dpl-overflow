import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const EditQuestionForm = ({props}) => {
  const [question, setQuestion] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(()=>{
    getQuestion()
  },[])

  const getQuestion = async () => {
    try {
      let res = await axios.get(`/api/questions/${props.match.params.id}`)
      setQuestion(res.data)
      setTitle(res.data.title)
      setBody(res.data.body)
    }catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = axios.put(`/api/questions/${props.match.params.id}`, {title, body})
      setQuestion(res.data)
      setTitle(res.data.title)
      setBody(res.data.body)
    }catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <h2>Edit Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Control 
            size='lg'
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control 
            as='textarea'
            value={body}
            placeholder='Explain your question here'
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type='submit'>Edit Question</Button>
      </Form>
    </Container>
  )
} 

export default EditQuestionForm;