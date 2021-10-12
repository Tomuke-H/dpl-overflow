import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import WebFont from "webfontloader";
import UpVote from '../UpVote';
import EditQuestionForm from "./EditQuestionForm"


const Question = ({props, edited,setEdited, history}) => {
  const [question, setQuestion] = useState(null)
  const [toggleEdit, setToggleEdit] = useState(false)

  const getQuestion = async () => {
    try {
      let res = await axios.get(`/api/questions/${props.match.params.id}`)
      setQuestion(res.data)
    }catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getQuestion()
    
  },[edited])

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Open Sans', 'Inter']
      }
    })
  }, [])


  const deleteQuestion = async (id) => {
    try{
      let res = await axios.delete(`/api/questions/${id}`)
      history.push('/dashboard')
    }catch (err) {
      console.log(err)
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
        <div style={styles.qdContainer}>
        <p style={styles.questionDetails} onClick={()=>setToggleEdit(!toggleEdit)}>Edit</p>
        {toggleEdit && <EditQuestionForm props={props} setEdited={setEdited}/>}
        <p style={styles.questionDetails} onClick={()=>deleteQuestion(question.id)}>Delete</p>
        </div>
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
  }
};

export default Question;