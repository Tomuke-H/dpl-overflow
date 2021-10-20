import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { AuthContext } from '../../providers/AuthProvider'
import { DPLButton } from '../DPLButtons'
import MarkdownEditor from '../Markdown/MarkdownEditor'
import FirstQuestionModal from './FirstQuestionModal'

const NewQuestionForm = ({ handleRedirect }) => {
  const {user} = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [checkedItems, setCheckedItems] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
    getTags()
    checkQuestions()
  },[])

  const checkQuestions = async() => {
    try {
      let res = await axios.get(`api/user_has_questions/${user.id}`)
      setShowModal(res.data < 1)
    } catch(err) {
      console.log(err)
    }
  }

  const getTags = async () => {
    try {
      let res = await axios.get('/api/tags')
      setTags(res.data)
    }catch (err){
      console.log(err)
    }
  }

  const handleCheckbox = (event)=>{
    // console.log(event.target.checked, event.target.id)
    setCheckedItems({...checkedItems, [event.target.id]: event.target.checked})
  }

  const tagList = () => {
    // console.log(checkedItems)
    return tags.map((t) => {
      return (
        <Form.Check inline
        type='checkbox'
        id={t.id}
        label={t.name}
        value={t.id}
        checked= {checkedItems[t.id]}
        onClick={handleCheckbox}
        />
      )
    })
  }

  const handleTagSubmit = async (res) =>{
    for (const [key, value] of Object.entries(checkedItems)) {
      if(value === true){
        let tagRes = await axios.post('/api/questionTags', {tag_id: key,question_id: res.data.id})
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post('/api/questions', {title, body, user_id: user.id})
      handleTagSubmit(res)
      handleRedirect(res.data.id)
    }catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <FirstQuestionModal showModal={showModal} setShowModal={setShowModal} />
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
        <MarkdownEditor
           body = {body}
           setBody = {setBody}
          />
        </Form.Group>
        <Form.Group>
            {tagList()}
        </Form.Group>
        <DPLButton variant="primary" type='submit'>SUBMIT</DPLButton>
      </Form>
    </Container>
  )
} 

export default NewQuestionForm;