import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../providers/AuthProvider'

const NewQuestionForm = ({ handleRedirect }) => {
  const {user} = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])

  useEffect(()=>{
    getTags()
  },[])

  const getTags = async () => {
    try {
      let res = await axios.get('/api/tags')
      setTags(res.data)
    }catch (err){
      console.log(err)
    }
  }

  const tagList = () => {
    return tags.map(t => {
      return (
        <option value={t.name} key={t.id}>{t.name}</option>
      )
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post('/api/questions', {title, body, user_id: user.id})
      handleRedirect(res.data.id)
    }catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <h2>New Question</h2>
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
        <Form.Group>
          <Form.Select>
            <option>I don't actually work yet</option>
            {tagList()}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type='submit'>Ask Question</Button>
      </Form>
    </Container>
  )
} 

export default NewQuestionForm;