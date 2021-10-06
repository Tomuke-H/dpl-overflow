import React from "react";
import { Card } from "react-bootstrap";

const QuestionCard = ({question}) => {
  return(
    <Card>
      <Card.Header>{question.title}</Card.Header>
      <Card.Body>{question.body}</Card.Body>
    </Card>
  )
}

export default QuestionCard;