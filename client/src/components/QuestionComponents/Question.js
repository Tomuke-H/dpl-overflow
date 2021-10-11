import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import WebFont from "webfontloader";


const Question = ({props, history}) => {
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
  },[])

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Open Sans']
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
      <Container >
        {/* <h1>{question.user_id}</h1> */}
        <h1 style={styles.questionHeader}>{question.title}</h1>
        <Card.Subtitle className="mb-2 text-muted">Created {question.created_at}</Card.Subtitle>
        <Card.Body>
          <Card.Text>{question.body}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
        <Button type="submit" onClick={()=>deleteQuestion(question.id)}>Delete</Button>
        </Card.Footer>
      </Container>
    )
  }


  return (
    <div>
      {renderQuestion()}
    </div>
  )
}

const styles = {
  questionHeader: {
    textTransform: "uppercase",
    marginTop: "70px",
    size: "30px",
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "600",

  },
};

export default Question;