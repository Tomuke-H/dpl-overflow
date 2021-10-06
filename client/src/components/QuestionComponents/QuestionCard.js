import React from "react";
import { Card, Button } from "react-bootstrap";

const QuestionCard = ({question, history}) => {
  const handleRedirect = (id) => {
    history.push(`/question/${question.id}`)
  }

  return(
    <Card>
      <Card.Header>{question.title}</Card.Header>
      <Card.Body>{question.body}</Card.Body>
      <Button onClick={()=>handleRedirect(question.id)}>View Question</Button>
    </Card>
  )
}

export default QuestionCard;