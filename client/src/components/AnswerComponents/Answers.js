import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import AnswerSort from './AnswerSort';
import NewAnswer from './NewAnswer';
import { seconds } from '../DayConverter/Dates';

const Answers = ({props}) => {
const [answers, setAnswers] = useState([])
const [sortBy, setSortBy] = useState("")
const [axiosProp, setAxiosProp] = useState("answers")

const getUnsortedAnswers = async () => {
  try {
    let res = await axios.get(`/api/questions/${props.match.params.id}/answers`)
    setAnswers(res.data)
  } catch (err) {
    console.log("getAnswers error", err)
  }
}

useEffect(()=>{
  getUnsortedAnswers()
}, [])

const getAnswersByOldest = async () => {
  let answersByOldest = [...answers].sort((a, b) => seconds(a.created_at) - seconds(b.created_at))
  setAnswers(answersByOldest)
}

const getAnswersByNewest = () => {
  let answersByNewest = [...answers].sort((a, b) => seconds(b.created_at) - seconds(a.created_at))
  setAnswers(answersByNewest)
}

const getAnswersByLikes = () => {
  let answersByLikes = [...answers].sort((a, b) => b.likes - a.likes)
  setAnswers(answersByLikes)
}

const getAnswers = (criteria) => {
  switch(criteria) {
    case "likes" :
      getAnswersByLikes()
    break;
    case "oldest" :
      getAnswersByOldest()
    break;
    case "newest" :
      getAnswersByNewest()
    break;
    default:
      alert("I'm not sure")
    break;
  }
}

const deleteAnswer = async (id) => {
  try {
    let res = await axios.delete(`/api/questions/${props.match.params.id}/answers/${id}`)
    console.log(res)
    let newAnswers = answers.filter((a) => a.id !== id)
    setAnswers(newAnswers)
  } catch (err) {
    console.log("deleteAnswer error", err)
  }
}

const renderAnswers = () => {
  return answers.map (a => {
    return (
      <Answer key={a.id} answer={a} props={props} deleteAnswer={deleteAnswer} axiosProp={axiosProp}/>
    )
  })
}
  return (
    <div>
      <div>
        <AnswerSort 
        sortBy={sortBy}
        setSortBy={setSortBy}
        getAnswers={getAnswers}/>
      </div>
      {renderAnswers()}
      <br />
      <NewAnswer props = {props}/>
      
    </div>
  );
};

const styles = {
  toggleGrid: {
    display: "flex",

  }
}

export default Answers;