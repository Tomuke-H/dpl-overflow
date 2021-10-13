import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import MarkdownView from "../Markdown/MarkdownView";

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
    console.log(tags)
    return tags.map((tag)=>{
      return <Card.Header style={{flexGrow:1}} key = {tag.id}>{tag.tag_name}</Card.Header>
    })
  }

  return(
    <Card onClick={()=>handleRedirect(question.id)}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <Card.Header style={{flexGrow:1}}>{question.title}</Card.Header>
      <div style={{display:"flex"}}>{renderTags()}</div>
      </div>
      <Card.Body>
        <Card.Text as={"div"}>
        <MarkdownView body = {question.body}/>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Created {question.created_at}</Card.Footer>
    </Card>
  )
}

export default QuestionCard; 