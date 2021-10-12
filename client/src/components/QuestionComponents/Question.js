import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import WebFont from "webfontloader";
import UpVote from '../UpVote';


const Question = ({props, edited, history}) => {
  const [question, setQuestion] = useState(null)

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
      <div>
      <Container>
        <UpVote question={question}/>
      </Container>
      <Container >
        {/* <h1>{question.user_id}</h1> */}
        <h1 style={styles.questionHeader}>{question.title}</h1>
        <div style={styles.qdContainer}>
        <h2 style={styles.questionDetails}>Asked: {question.created_at}</h2>
        {/* need some help getting the date to look different - either google or classmates but nOT RIGHT NOW */}
        <h2 style={styles.questionDetails}>Active: Today</h2>
        <h2 style={styles.questionDetails}>Viewed: </h2>
        </div>
        <p style={styles.questionDetails}> {question.body} </p> 
        <Button type="submit" onClick={()=>deleteQuestion(question.id)}>Delete</Button>
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
    alignItems: "center",
    letterSpacing: ".5px",
    color: "#000000",
  },
  qdContainer: {
    display: "flex",
    flexDirection: "row",
  }
};

export default Question;