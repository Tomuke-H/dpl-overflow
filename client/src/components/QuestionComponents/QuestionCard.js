import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { day, time } from "../DayConverter/Dates";
import QuestionAuthor from "./QuestionAuthor";


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
      return <Card.Text key={tag.id} style={{marginRight: '10px', color: 'purple'}}>{tag.tag_name}</Card.Text>
    })
  }

  return(
    <Card onClick={()=>handleRedirect(question.id)}>
      <div style={{display:"flex", justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', margin: '25px'}}>
          <div >
            <Card.Text style={styles.vav}>{question.likes}</Card.Text>
            <Card.Text style={styles.vavcat}>Votes</Card.Text>
          </div>
          <div>
            <Card.Text style={styles.vav}>{question.total_answers}</Card.Text>
            <Card.Text style={styles.vavcat}>Answers</Card.Text>
          </div>
          <div >
            <Card.Text style={styles.vav}>{question.views}</Card.Text>
            <Card.Text style={styles.vavcat}>Views</Card.Text>
          </div>
        </div>
        <div style={styles.title}>
          <Card.Text>{question.title}</Card.Text>
          <div style={styles.tags}>{renderTags()}</div>
          {/* <Card.Text>{question.body}</Card.Text> */}
        </div>
        <Card.Text className="text-muted"> {QuestionAuthor(question.id)} / {day(question.created_at)} / {time(question.created_at)} </Card.Text>
      </div>
    </Card>
  )
}

const styles = {

  vav:{
    margin: "10px 10px 0px 10px",
    textAlign: "center"
  },
  
  vavcat:{
    margin: "0px 10px 10px 10px",
  },

  title:{
    flex: "1"
  },
  tags:{
    display:"flex"
  },
  
}

export default QuestionCard; 