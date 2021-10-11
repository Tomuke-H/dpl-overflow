import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'

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
      <Card>
        <Card.Header>{question.user_id}</Card.Header>
        <Card.Title>{question.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Created {question.created_at}</Card.Subtitle>
        <Card.Body>
          <Card.Text>{question.body}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
        <Button type="submit" onClick={()=>deleteQuestion(question.id)}>Delete</Button>
        </Card.Footer>
      </Card>
    )
  }


  return (
    <div>
      {renderQuestion()}
    </div>
  )
}

export default Question;