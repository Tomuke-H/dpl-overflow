import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const QuestionCard = ({question, history}) => {
  const handleRedirect = (id) => {
    history.push(`/question/${question.id}`)
  }

  useEffect(()=>{
    getTags()
  },[])
  const [tags, setTags] = useState([])

  const getTags = async () => {
    try {
      let res = await axios.get(`/api/tagwithname/${question.id}`)
      setTags(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTags = () => {
    return tags.map((tag)=>{
      return <Card.Text style={{marginRight: '10px'}}>{tag.tag_name}</Card.Text>
    })
  }

  return(
    <Card onClick={()=>handleRedirect(question.id)}>
      <div style={{display:"flex"}}>
      <Card.Header style={{flexGrow:1}}>{question.title}</Card.Header>
      </div>
      <Card.Body>
        <Card.Text>{question.body}</Card.Text>
        <div style={{display:"flex"}}>{renderTags()}</div>
      </Card.Body>
      <Card.Body>
        <Card.Text>views: {question.views}</Card.Text>
        <Card.Text>votes: {question.likes}</Card.Text>
        <Card.Text>qid: {question.id}</Card.Text>
        <Card.Text>answers: {question.total_answers}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Created {question.created_at}</Card.Footer>
    </Card>
  )
}

export default QuestionCard; 