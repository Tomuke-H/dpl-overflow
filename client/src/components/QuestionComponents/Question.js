import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../../providers/AuthProvider';
import QuestionVote from '../QuestionVote';
import MarkdownView from '../Markdown/MarkdownView';
import EditQuestionForm from "./EditQuestionForm";
import QComments from "../QCommentComponents/QComments";
import NewQCommentForm from "../QCommentComponents/NewQCommentForm";
import { day, time } from "../DayConverter/Dates";
import Follow from './Follow';
import AuthorBox from './AuthorBox';
import Share from './Share';
import BoxLoader from "../BoxLoader";


const Question = ({props, edited, setEdited, history, question, loading}) => {
  const [qcomments, setQComments] = useState([])
  const [toggleEdit, setToggleEdit] = useState(false)
  const [tags, setTags] = useState([])
  const [showQCommentForm, setShowQCommentForm] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getQComments();
    getTags();
  }, [edited])

  const getQComments = async () => {
    try{
      let res = await axios.get(`/api/questions/${props.match.params.id}/qcomments/`)
      // console.log("qcomments:", res.data)
      setQComments(res.data)
    } catch(error) {
      console.log("Error getting qcomments", error)
    }
  };

  const addQComment = async (e, qcomment) => {
    e.preventDefault()
    try {
      let res = await axios.post(`/api/questions/${question.id}/qcomments/`, qcomment)
      setQComments([...qcomments, res.data])
    } catch(err) {
      console.log("add qcomment error", err)
    }
  }

  const updateQComments = (qcomment) => {
    const updatedQComments = qcomments.map((qc) => (qc.id === qcomment.id ? qcomment : qc));
    setQComments(updatedQComments)
  }


  const deleteQComment = async (id) => {
    try{
      await axios.delete(`/api/questions/${question.id}/qcomments/${id}`)
      const filterQComments = qcomments.filter((qcomment) => qcomment.id !== id);
      setQComments(filterQComments)
    } catch(err) {
    console.log("delete qcomment error", err)    }
  }

  const getTags = async () => {
    try {
      let res = await axios.get(`/api/tagwithname/${props.match.params.id}`)
      setTags(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTags = () => {
    // console.log("tags", tags)
    return tags.map((tag)=>{
      return(
         <p style={styles.qTagBox}>{tag.tag_name}</p>
      )
    })
  }

  const deleteQuestion = async (id) => {
    try{
      let res = await axios.delete(`/api/questions/${id}`)
      history.push('/dashboard')
    }catch (err) {
      console.log(err)
    }
  }

  const showEditDelete = () => {
    if (question.user_id === user.id) {
      return (        
        <div style={styles.qdContainer}>
        <p style={styles.questionDetails} onClick={()=>setToggleEdit(!toggleEdit)}>{toggleEdit ? "Cancel" : "Edit Question"}</p>
        <p style={styles.questionDetails} onClick={()=>deleteQuestion(question.id)}>Delete Question</p>
        {toggleEdit && <EditQuestionForm props={props} setEdited={setEdited} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit}/>}
        </div>
      )
    }
  }

  const renderQuestion = () => {
    if(loading)
    return(
      <BoxLoader />
    )
    if(!question){
      return(
        <h2>404 Question Not Found</h2>
      )
    }
    return(
      <div style={styles.theMightyDiv}>
        <div style={styles.likesContainer}>
        <QuestionVote question={question} liked_questions = {user.liked_questions} downvote_questions = {user.downvote_questions}/>
        </div>
      <Container style={styles.questionContainer}>
        <h1 style={styles.questionHeader}>{question.title}</h1>
        <div style={styles.qdContainer}>
        <h2 style={styles.questionDetails}>Asked: {day(question.created_at)} / {time(question.created_at)}</h2>
        <h2 style={styles.questionDetails}>Viewed: {question.views} times</h2>
        </div>
        <div style={styles.questionDetails}><MarkdownView body = {question.body}/></div> 
        <div style={{display: "flex", height: "66px"}}>
        {renderTags()}
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
            {showEditDelete()}
        <Follow user={user} follow ={user.follow} question={question.id}/>
        <Share/>
             <p style={styles.addComment} onClick={()=>setShowQCommentForm(!showQCommentForm)}>{showQCommentForm ? "Cancel" : "Add Comment"}</p>
            {showQCommentForm && <NewQCommentForm question={question} addQComment={addQComment}/>}
          </div>
        <div style={styles.authorBox}>
        <AuthorBox question={question}/>
        </div>
        </div>
      </Container>
      </div>
    )
  }


  return (
    <div>
      {renderQuestion()}
      <div style={styles.littleBorder}/>
      <QComments addQComment={addQComment} updateQComments={updateQComments} deleteQComment={deleteQComment} qcomments={qcomments} setQComments={setQComments} question={question}/>
    </div>
  )
}

const styles = {
  theMightyDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px"
  },
  likesContainer: {
    display: "flex",
    alignItems: "flex-start"
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "66px"
  },
  questionHeader: {
    textTransform: "uppercase",
    marginTop: "70px",
    fontSize: "30px",
    fontWeight: "600px",
    color: "#000000",
  },
  questionDetails: {
    marginRight: "15px",
    marginTop: "30px",
    fontSize: "14px",
    fontWeight: "500px",
    display: "flex",
    alignItems: "left",
    letterSpacing: ".5px",
    color: "#000000",
  },
  qdContainer: {
    display: "flex",
    flexDirection: "row",
  },
  qTagBox: {
    margin: "10px",
    padding: "5px",
    border: "1px solid",
    height: "20px",
    color: "#000000",
    boxSizing: "borderBox",
    fontSize: "10px",
    fontWeight: "500px",
    display: "flex",
    alignItems: "center",
    letterSpacing: ".5px",
  },
  addComment: {
    margin: "10px",
    fontSize: "14px",
    fontWeight: "500px",
    color: "#757575"
  },
  littleBorder:{
    marginLeft: "207px",
    marginRight: "285px",
    borderBottom: "1.5px solid rgba(0, 0, 0, 0.3)",
  },
};

export default Question;