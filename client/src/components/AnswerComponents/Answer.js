import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Comments from '../CommentComponents/Comments'
import NewCommentForm from '../CommentComponents/NewCommentForm'
import { AuthContext } from '../../providers/AuthProvider'
import EditAnswer from './EditAnswer'

const Answer = ({answer, props, deleteAnswer}) => {
  const [comments, setComments] = useState([])
  const history = useHistory();
  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(AuthContext)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () => {
    try{
      let res = await axios.get(`/api/answers/${answer.id}/comments/`)
      console.log("comments:", res.data)
      setComments(res.data)
    } catch(error) {
      alert("error getting comments, but that sounds like a YOU problem")
    }
  };

  const addComment = async (e, comment) => {
    e.preventDefault()
    console.log(comment)
    try {
      await axios.post(`/api/answers/${answer.id}/comments/`, comment)
      setComments([...comments, comment])
    } catch(err) {
      console.log(err)
      alert("somethin ain't right...")
    }
  }

  const updateComments = (comment) => {
    const updatedComments = comments.map((c) => (c.id === comment.id ? comment : c));
    setComments(updatedComments)
  }

  const renderAnswer = () => {
    if(!answer){
      return(
        <h2>There are no answers</h2>
      )
    }
    return(
      <div>
        <h2>{answer.body}</h2>
      </div>
    )
  }

  const showEditForm = () => {
  return (<Button onClick={()=>setShowForm(!showForm)}>Edit</Button>
  )}


  const userEdit = () => {
    if (answer.user_id === user.id) {
      return showEditForm()
    } else {
      console.log("not your answer")
    }
  }

  const userDelete = () => {
   if (answer.user_id === user.id) {
     return showDeleteButton() 
   } else {
     console.log("not your answer")
   }
  }

  const showDeleteButton = () => {
 return (<Button type="submit" onClick={()=>deleteAnswer(answer.id)}>Delete</Button>)
  }

  return (
    <div>
      {renderAnswer()}
      {userEdit()}
      {userDelete()}
      {showForm && <EditAnswer a = {answer} props = {props}/>}
      <Comments addComment={addComment} updateComments={updateComments} comments={comments} setComments={setComments} answer={answer}/>
    </div>
  )
}

export default Answer;