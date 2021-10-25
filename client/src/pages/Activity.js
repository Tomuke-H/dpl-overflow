import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    console.log("answers:", res)
    setUserAnswers(res.data.user)
    console.log("user:", userAnswers)
  } catch (err) {
    console.log(err)
  }
}
const getUserQuestions = async () => {
  try {
    let res = await axios.get(`/api/user_questions/${user.id}`)
    console.log("quetsions:", res)
    setUserQuestions(res.data.user)
    console.log("userq:", userQuestions)
  } catch (err) {
    console.log(err)
  }
}

const renderQuestions = () => {
  if (userQuestions[0].question_id === null) {
    return <p>{userQuestions[0].name} has no questions.</p>
  } else {
  return (
    userQuestions.map((ques)=> {
      return (
        <NavLink as={Link} to={`/question/${ques.question_id}`}>
        <Card>
          <Card.Body>{ques.title} {ques.question_body} {ques.question_created}</Card.Body>
        </Card>
        </NavLink>
      )
    })
  )
  }
}
const renderAnswers = () => {
  if (userAnswers[0].answer_id === null) {
    return <p>{userAnswers[0].name} has no answers.</p>
  } else {
  return (
    userAnswers.map((ans)=> {
      return (
        <NavLink as={Link} to={`/question/${ans.question_id}`}>
        <Card>
        <Card.Body>{ans.answer_body} {ans.answer_created}</Card.Body>
        </Card>
        </NavLink>
      )
    })
    )
  }
}

useEffect(()=>{
  getUserAnswers();
},[])
useEffect(()=>{
  getUserQuestions();
},[])

  return (
    <div>
      <DPLButton onClick={()=>setShowQuestions(!showQuestions)}>Questions</DPLButton>
      {showQuestions && renderQuestions()}
      <DPLButton onClick={()=>setShowAnswers(!showAnswers)}>Answers</DPLButton>  
      {showAnswers && renderAnswers()}
    </div>
  );
};

export default Activity;