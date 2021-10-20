import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { day, time } from "../DayConverter/Dates";
import { TagPill } from "../TagComponents/TagPill";
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
      return <TagPill>{tag.tag_name}</TagPill>
    })
  }

  return(
    <Card onClick={()=>handleRedirect(question.id)}>
      <div style={styles.maindiv}>
        <div style={styles.vavdiv}>
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
          <Card.Text style={styles.titleWords}>{question.title}</Card.Text>
          <div style={styles.tags}>{renderTags()}</div>
        <Card.Text className="text-muted" style={styles.info}> {QuestionAuthor(question.id)} / {day(question.created_at)} / {time(question.created_at)} </Card.Text>
        </div>
      </div>
    </Card>
  )
}

const styles = {
  maindiv:{
    display:"flex",
    justifyContent: 'space-between'
  },
  vavdiv:{
    display: 'flex',
    justifyContent: 'space-around', 
    margin: '20px'
  },

  vav:{
    margin: "10px 10px 0px 10px",
    fontSize: "1.3em",
    fontWeight:"600px",
    textAlign: "center"
  },
  
  vavcat:{
    margin: "0px 10px 10px 10px",
  },

  title:{
    display:"flex",
    flexDirection:"column",
    flex: "1"
    
  },

  titleWords:{
    fontFamily:'Open Sans',
    fontWeight:"600px",
    fontSize: "1.3em",
    letterSpacing: "1px",
    color:"#FFFFFF;",
    textAlign:"left",
    margin:"1em 0em .5em 5px",
  },

  tags:{
    display:"flex"
  },

  info:{
    textAlign:"end",
    padding:"0px 10px 10px 0px",
  },
  
}

export default QuestionCard; 