import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Comments from '../CommentComponents/Comments'
import NewCommentForm from '../CommentComponents/NewCommentForm'
import EditAnswer from './EditAnswer'

const Answer = ({answer, props, deleteAnswer}) => {
  const [comments, setComments] = useState([])
  const history = useHistory();
  const [showForm, setShowForm] = useState(false)

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
        <Button type="submit" onClick={()=>deleteAnswer(answer.id)}>Delete</Button>
      </div>
    )
  }
  return (
    <div>
      {renderAnswer()}
      <Button onClick={()=>setShowForm(!showForm)}>Edit</Button>
      {showForm && <EditAnswer a = {answer} props = {props}/>}
      <Comments addComment={addComment} updateComments={updateComments} comments={comments} setComments={setComments} answer={answer}/>
    </div>
  )
}

export default Answer;