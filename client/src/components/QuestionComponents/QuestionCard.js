import React from "react";
import { Card } from "react-bootstrap";

const QuestionCard = ({question, history}) => {
  const handleRedirect = (id) => {
    history.push(`/question/${question.id}`)
  }

  return(
    <Card onClick={()=>handleRedirect(question.id)}>
      <Card.Header>{question.title}</Card.Header>
      <Card.Body>
        <Card.Text>{question.body}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Created {question.created_at}</Card.Footer>
    </Card>
  )
}

export default QuestionCard; 