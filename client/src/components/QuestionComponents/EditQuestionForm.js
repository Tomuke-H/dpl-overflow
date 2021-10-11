import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const EditQuestionForm = ({props, setEdited}) => {
  const [question, setQuestion] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [tagsDone, setTagsDone] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})
  const [checkedTagDone, setCheckedTagDone] = useState(false)
  let norm = []
  let tagID = []
  
  useEffect(()=>{
    getQuestion()
    getTags()
    getQuestionTag()
  },[tagsDone])

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

  const getTags = async () => {
    try {
      let res = await axios.get('/api/tags')
      setTags(res.data)
      setTagsDone(true)
    }catch (err){
      console.log(err)
    }
  }

  const getQuestionTag = async () => {
    try {
      let res = await axios.get(`/api/questionTags/${props.match.params.id}`)
      normalizeCheckedItems(res.data)
    }catch (err){
      console.log(err)
    }
  }

  const normalizeCheckedItems = (data) =>{
    for (let i = 0; i < tags[tags.length-1].id+1; i++) {
      norm.push({tag_id: i})
    }
    for (let i = 0; i < data.length; i++) {
      tagID.push(data[i].tag_id)
    }
    for( var tag_id in norm){
      if(tagID.includes(Number(tag_id))===true){
        norm[tag_id].checked = true
      }else{norm[tag_id].checked = false}
    }
    setCheckedItems(norm)
    setCheckedTagDone(true)
  }

  const handleCheckbox = (event)=>{
    setCheckedItems({...checkedItems, [event.target.id]: event.target.checked})
  }

  const tagList = () => {
    return tags.map((t) => {
      if(checkedItems[t.id].checked){
      return (
        <Form.Check key={t.id} inline
        type='checkbox'
        id={t.id}
        label={t.name}
        value={t.id}
        checked
        onClick={handleCheckbox}
        />
      )}
      else{
        return(
        <Form.Check
        key = {t.id}
        inline
        type='checkbox'
        id={t.id}
        label={t.name}
        value={t.id}
        onClick={handleCheckbox}
        />)
      }
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
      let res = await axios.put(`/api/questions/${props.match.params.id}`, {title, body})
      console.log(res)
      setQuestion(res.data)
      setTitle(res.data.title)
      setBody(res.data.body)
      handleTagSubmit(res)
      setEdited(true)
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
        <Form.Group>
            { checkedTagDone && tagList()}
        </Form.Group>
        <Button variant="primary" type='submit'>Edit Question</Button>
      </Form>
    </Container>
  )
} 

export default EditQuestionForm;

