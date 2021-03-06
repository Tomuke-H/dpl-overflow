import axios from 'axios'
import Multiselect from 'multiselect-react-dropdown'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { AuthContext } from '../../providers/AuthProvider'
import { DPLButton } from '../DPLButtons'
import MarkdownEditor from '../Markdown/MarkdownEditor'
import NewTagModal from '../TagComponents/NewTagModal'
import FirstQuestionModal from './FirstQuestionModal'

const NewQuestionForm = ({ handleRedirect }) => {
  const {user} = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [checkedItems, setCheckedItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showTagModal, setShowTagModal] = useState(false)
  const [selectedValues, setSelectedValues] = useState([])
  const [errors, setErrors] = useState(null)

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

  const handleAddTag = (list) => {
    setCheckedItems(list)
    setSelectedValues(list)
  }

  const handleRemoveTag = (list) => {
    setCheckedItems(list)
    setSelectedValues(list)
  }

  const handleTagSubmit = async (questionRes) =>{
    for (const t of checkedItems){
      try{
        let res = await axios.post('/api/questionTags', {tag_id: t.id, question_id: questionRes.data.id})
      }catch (err) {
        console.log(err)
      }
    }
  }

  const handleSubmit = async (e) => {
    setErrors(null)
    console.log(e)
    e.preventDefault()
    if(!body){
      setErrors('Body cannot be empty')
    } else {
      try {
        let res = await axios.post('/api/questions', {title, body, user_id: user.id})
        handleTagSubmit(res)
        handleRedirect(res.data.id)
      }catch (err) {
        console.log(err)
      }
    }
  }

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <Container>
      {errors && <h2 style={{border: 'solid 2px red', color: 'red'}}>{errors}</h2>}
      <FirstQuestionModal showModal={showModal} setShowModal={setShowModal} />
      <NewTagModal checkedItems={checkedItems} setCheckedItems={setCheckedItems} tags={tags} setTags={setTags} selectedValues={selectedValues} setSelectedValues={setSelectedValues} showTagModal={showTagModal} setShowTagModal={setShowTagModal} />
      <h2 style={styles.title}>ASK A QUESTION</h2>
      <div style={styles.formWrapper}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <p style={styles.topLabel}>Title</p>
            <Form.Control 
              required
              size='lg'
              value={title}
              onKeyDown={(e)=>{checkKeyDown(e)}}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
          <p style={styles.label}>Body</p>
          <MarkdownEditor
            body = {body}
            setBody = {setBody}
            />
          </Form.Group>
          <Form.Group onKeyDown={(e)=>{checkKeyDown(e)}}>
            <p style={styles.label}>Tags</p>
            <Multiselect 
            options={tags}
            selectedValues={selectedValues}
            emptyRecordMsg = "Not an Option, please consider making new tag"
            onSelect={(selectedList, selectedItem) => handleAddTag(selectedList)}
            onRemove={(selectedList, selectedItem) => handleRemoveTag(selectedList)}
            displayValue="name"
            placeholder='Select Tags'
            style={styles.multiSelect}
            closeIcon="cancel"
            avoidHighlightFirstOption="true"
            />
            {/* {tagList()} */}
          </Form.Group>
          <br />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={styles.newTagToggle} type='button' onClick={(e)=>setShowTagModal(true)}>New Tag</div>
            <DPLButton variant="primary" type='submit'>SUBMIT</DPLButton>
          </div>
        </Form>
      </div>
    </Container>
  )
} 

const styles = {
  questionHeader: {
    textTransform: "uppercase",
    marginTop: "70px",
    fontSize: "30px",
    fontWeight: "600",
    color: "#000000",
  },
  multiSelect: {
    chips: {
      background: '#6E54A3',
    },
  },
  formWrapper: {
    border: 'solid 1px black',
    borderRadius: '6px',
    backgroundColor: 'white',
    padding: '25px 45px 25px 45px',
    margin: '40px 0px 0px 0px'
  },
  newTagToggle: {
    width: '140px',
    height: '33px',
    display: 'inline-block',
    borderStyle: 'solid',
    borderColor: '#757575',
    borderRadius: '5px',
    fontFamily: 'Lato',
    fontWeight: '600px',
    fontSize: '14px',
    letterSpacing: '.7px',
    color: 'white',
    backgroundColor: '#757575',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingTop: '2px'
  },
  title: {
    marginTop: '20px'
  },
  label: {
    fontWeight: '600',
    marginTop: '20px'
  },
  topLabel: {
    fontWeight: '600'
  }
}

export default NewQuestionForm;