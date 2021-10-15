import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import NewAnswer from './NewAnswer';

const Answers = ({props}) => {
const [answers, setAnswers] = useState([])

const getAnswers = async () => {
  try {
    let res = await axios.get(`/api/questions/${props.match.params.id}/answers`)
    setAnswers(res.data)
  } catch (err) {
    console.log("getAnswers error", err)
  }
}

useEffect(()=>{
  getAnswers();
}, [])

const deleteAnswer = async (id) => {
  try {
    let res = await axios.delete(`/api/questions/${props.match.params.id}/answers/${id}`)
    let newAnswers = answers.filter((a) => a.id !== id)
    setAnswers(newAnswers)
  } catch (err) {
    console.log("deleteAnswer error", err)
  }
}

const renderAnswers = () => {
  return answers.map (a => {
    return (
      <Answer key={a.id} answer = {a} props = {props} deleteAnswer = {deleteAnswer}/>
    )
  })
}
  return (
    <div>
      {renderAnswers()}
      <br />
      <NewAnswer props = {props}/>
      
    </div>
  );
};

export default Answers;