import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Card, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DPLButton } from '../components/DPLButtons';
import { ProfilePill } from '../components/UserComponents/ProfileStyles';
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components';
import Question from '../components/QuestionComponents/Question';

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
        <QuestionCard style={{display: 'flex', flexDirection: 'column', alignContent: 'space-around'}}>
          <QuestionContent>{ques.title}</QuestionContent>
          <QuestionContent>Created at: {ques.question_created}</QuestionContent>
        </QuestionCard>
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
        <QuestionCard style={{display: 'flex', flexDirection: 'column', alignContent: 'space-around'}}>
        <QuestionContent>{ans.answer_body}</QuestionContent>
        <QuestionContent>Created at: {ans.answer_created}</QuestionContent>
        </QuestionCard>
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
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
      <ProfilePill onClick={()=>setShowQuestions(!showQuestions)}>Questions</ProfilePill>
      {showQuestions && renderQuestions()}
      </div>
      <div>
      <ProfilePill onClick={()=>setShowAnswers(!showAnswers)}>Answers</ProfilePill>  
      {showAnswers && renderAnswers()}
      </div>
    </div>
  );
};

export default Activity;

const QuestionCard = styled.div`
border: solid 2px black;
border-radius: 6px;
display: flex;
justify-content: space-between;
font-weight: medium;
`

const QuestionContent = styled.div`
font-weight: semi-bold;
font-size: 16px;
letter-spacing: 1px;
text-align: left;
color: black;
margin: 1em;
`