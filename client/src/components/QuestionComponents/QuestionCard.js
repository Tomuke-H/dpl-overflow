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
      return <Card.Text style={{marginRight: '10px', color: 'purple'}}>{tag.tag_name}</Card.Text>
    })
  }

  return(
    <Card onClick={()=>handleRedirect(question.id)}>
      <div style={{display:"flex", justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', margin: '25px'}}>
          <div style={{margin: '10px'}}>
            <Card.Text>{question.views}</Card.Text>
            <Card.Text>Views</Card.Text>
          </div>
          <div style={{margin: '10px'}}>
            <Card.Text>{question.likes}</Card.Text>
            <Card.Text>Votes</Card.Text>
          </div>
          <div style={{margin: '10px'}}>
            <Card.Text>{question.total_answers}</Card.Text>
            <Card.Text>Answers</Card.Text>
          </div>
        </div>
        <div>
          <Card.Text style={{flexGrow:1}}>{question.title}</Card.Text>
          <div style={{display:"flex"}}>{renderTags()}</div>
          {/* <Card.Text>{question.body}</Card.Text> */}
        </div>
        <Card.Text className="text-muted">Created {question.created_at}</Card.Text>
      </div>
    </Card>
  )
}

export default QuestionCard; 