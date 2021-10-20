import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { DPLButton } from '../components/DPLButtons';
import { AuthContext } from '../providers/AuthProvider';

const Activity = ({user}) => {
  const [userAnswers, setUserAnswers] = useState([])
  const [userQuestions, setUserQuestions] = useState({})
  const [showAnswers, setShowAnswers] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)

const getUserAnswers = async () => {
  try {
    let res = await axios.get(`/api/user_answers/${user.id}`)
    console.log("res:", res)
    setUserAnswers(res.data.user)
    console.log("user:", userAnswers)
  } catch (err) {
    console.log(err)
  }
}
const getUserQuestions = async () => {
  try {
    let res = await axios.get(`/api/user_questions/${user.id}`)
    console.log("res:", res)
    setUserQuestions(res.data.user)
    console.log("user:", userQuestions)
  } catch (err) {
    console.log(err)
  }
}

const renderQuestions = () => {
  return (
    userQuestions.map((ques)=> {
      return (
        <p>{ques.title}, {ques.question_body}, {ques.question_created}</p>
      )
    })
  )
}
const renderAnswers = () => {
  return (
    userAnswers.map((ans)=> {
      return (
        <Card>
        <Card.Body>{ans.answer_body} {ans.answer_created}</Card.Body>
        </Card>
      )
    })
    )
  
}


useEffect(()=>{
  getUserQuestions();
},[])
useEffect(()=>{
  getUserQuestions();
},[])

  return (
    <div>
      <DPLButton onClick={()=>renderQuestions()}>Questions</DPLButton>
      <DPLButton onClick={()=>renderAnswers()}>Answers</DPLButton>  
    </div>
  );
};

export default Activity;