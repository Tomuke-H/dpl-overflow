import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Comments from '../CommentComponents/Comments'
import { AuthContext } from '../../providers/AuthProvider'
import EditAnswer from './EditAnswer'
import AnswerVote from './AnswerVote'
import MarkdownView from '../Markdown/MarkdownView'
import NewCommentForm from "../CommentComponents/NewCommentForm"

const Answer = ({answer, props, deleteAnswer}) => {
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(AuthContext)
  const [showCommentForm, setShowCommentForm] = useState(false)

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () => {
    try{
      let res = await axios.get(`/api/answers/${answer.id}/comments/`)
      setComments(res.data)
    } catch(error) {
      console.log("getComments error", error)
    }
  };

  const addComment = async (e, comment) => {
    try {
      await axios.post(`/api/answers/${answer.id}/comments/`, comment)
      setComments([...comments, comment])
    } catch(err) {
      console.log("addComment error", err)
    }
  }

  const updateComments = (comment) => {
    const updatedComments = comments.map((c) => (c.id === comment.id ? comment : c));
    setComments(updatedComments)
  }


  const deleteComment = async (id) => {
    try{
      await axios.delete(`/api/answers/${answer.id}/comments/${id}`)
      const filterComments = comments.filter((comment) => comment.id !== id);
      setComments(filterComments)
    } catch {
      alert("Ah shucks.  I don't know what I'm trying to do, but clearly it ain't workin.")
    }
  }

  const showEditDelete = () => {
    if (answer.user_id === user.id) {
      return (        
        <div style={styles.adContainer}>
        <p style={{margin: "10px"}} onClick={()=>setShowForm(!showForm)}>{showForm ? "Cancel" : "Edit Answer"}</p>
        <p style={{margin: "10px"}} onClick={()=>deleteAnswer(answer.id)}>Delete Answer</p>
        {showForm && <EditAnswer a = {answer} props = {props}/>}
        </div>
      )
    }
  }

  const renderAnswer = () => {
    if(!answer){
      return(
        <h2>There are no answers</h2>
      )
    }
    return(
      <div style={styles.theMightyDiv}>
        <div style={styles.likesContainer}>
          <AnswerVote answer={answer}/>
        </div>
        <div style={styles.answerContainer}>
          <div style={styles.answerDetails}><MarkdownView body = {answer.body}/></div>
          {showEditDelete()}
        <p style={styles.addComment} onClick={()=>setShowCommentForm(!showCommentForm)}>{showCommentForm ? "Cancel" : "Add Comment"}</p>
        {showCommentForm && <NewCommentForm answer={answer} addComment={addComment}/>}
        </div>
      </div>
    )
  }


 

  return (
    <div>
      {renderAnswer()}
      <Comments addComment={addComment} updateComments={updateComments} deleteComment={deleteComment} comments={comments} setComments={setComments} answer={answer}/>
    </div>
  )
}

const styles = {
  theMightyDiv: {
    padding: "28px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderTop: "1px solid rgba(0, 0, 0, 0.3)",
  },
  likesContainer: {
    marginRight: "66px",
    padding: "0px"
  },
  answerDetails: {
    width: "850px",
    marginRight: "10px",
    fontSize: "16px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    display: "flex",
    alignItems: "left",
    letterSpacing: ".5px",
    color: "#000000",
  },
  adContainer: {
    display: "flex",
    flexDirection: "row",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    marginTop: "30px",
  },
  answerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  addComment: {
    margin: "10px",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    color: "#757575"
  }
}

export default Answer;