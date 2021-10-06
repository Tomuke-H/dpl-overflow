import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container } from "react-bootstrap";

const Questions = ({history}) => {
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    getQuestions()
  },[])

  const getQuestions = async () => {
    try{
      let res = await axios.get('/api/questions')
      setQuestions(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const renderQuestions = () => {
    return questions.map(q => {
      return (
        <div key={q.id} style={{marginBottom: "30px"}}>
          <QuestionCard question={q} history={history}/>
        </div>
      )
    })
  }

  return (
    <Container>
      {renderQuestions()}
    </Container>
  )
}

export default Questions;