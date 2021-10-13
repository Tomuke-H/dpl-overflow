import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import WebFont from "webfontloader";
import { AuthContext } from '../../providers/AuthProvider';
import UpVote from '../UpVote';
import EditQuestionForm from "./EditQuestionForm"


const Question = ({props, edited,setEdited, history, question}) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [tags, setTags] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getTags();
    WebFont.load({
      google: {
        families: ['Open Sans', 'Inter']
      }
    })
  }, [])

  const getTags = async () => {
    try {
      let res = await axios.get(`/api/tagwithname/${question.id}`)
      setTags(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTags = () => {
    console.log(tags)
    return tags.map((tag)=>{
      return <div style={styles.qTagBox}>{tag.tag_name}</div>
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
        <p style={styles.questionDetails} onClick={()=>setToggleEdit(!toggleEdit)}>{toggleEdit ? "Cancel" : "Edit"}</p>
        <p style={styles.questionDetails} onClick={()=>deleteQuestion(question.id)}>Delete</p>
        {toggleEdit && <EditQuestionForm props={props} setEdited={setEdited} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit}/>}
        </div>
      )
    }
  }

  const renderQuestion = () => {
    if(!question){
      return(
        <h2>404 Question Not Found</h2>
      )
    }
    return(
      <div style={styles.theMightyDiv}>
        <div style={styles.likesContainer}>
        <UpVote question={question}/>
        </div>
      <Container style={styles.questionContainer}>
        {/* <h1>{question.user_id}</h1> */}
        <h1 style={styles.questionHeader}>{question.title}</h1>
        <div style={styles.qdContainer}>
        <h2 style={styles.questionDetails}>Asked: {question.created_at}</h2>
        {/* need some help getting the date to look different - either google or classmates but nOT RIGHT NOW */}
        <h2 style={styles.questionDetails}>Active: Today</h2>
        <h2 style={styles.questionDetails}>Viewed: </h2>
        </div>
        <p style={styles.questionDetails}> {question.body} </p> 
        <div style={{display:"flex"}}>{renderTags()}</div>
        {showEditDelete()}
      </Container>
      </div>
    )
  }


  return (
    <div>
      {renderQuestion()}
    </div>
  )
}

const styles = {
  theMightyDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  likesContainer: {
    marginRight: "66px",
    padding: "0px"
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "66px"
    // alignItems: "left",
  },
  questionHeader: {
    width: "800px",
    textTransform: "uppercase",
    marginTop: "70px",
    fontSize: "30px",
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "600",
    color: "#000000",
  },
  questionDetails: {
    maxWidth: "850px",
    marginTop: "30px",
    marginRight: "10px",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
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
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    letterSpacing: ".5px",
    color: "#000000", 
  }
};

export default Question;