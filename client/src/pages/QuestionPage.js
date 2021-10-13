import React, { useEffect } from "react";
import Question from "../components/QuestionComponents/Question";
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router";
import Answers from "../components/AnswerComponents/Answers";
import axios from "axios";

const QuestionPage = (props) => {
  const history = useHistory()
  const [question, setQuestion] = useState(null)
  const [edited, setEdited] = useState(false)
  const [answerCount, setAnswerCount] = useState([])

  useEffect(()=>{
      getQuestion()
      setEdited(false)
      getAnswerCount()
      addView()
  }, [edited])

  const getQuestion = async () => {
    try {
      let res = await axios.get(`/api/questions/${props.match.params.id}`)
      setQuestion(res.data)
    }catch (err) {
      console.log(err)
    }
  }

  const getAnswerCount = async () => {
    try {
      let res = await axios.get(`/api/answer_count/${props.match.params.id}`)
      setAnswerCount(res.data[0].count) 
    } catch(err) {
      console.log(err)
    }
  }
  
  const addView = async () => {
    try{
      let res = await axios.put(`/api/add_view/${props.match.params.id}`)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <Question props={props} edited = {edited} setEdited={setEdited} history={history} question={question}/>
      <p>{answerCount} Answers </p>
      <Answers props = {props} /> 
    </div>
  )
}

export default QuestionPage;