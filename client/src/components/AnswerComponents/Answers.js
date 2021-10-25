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
const [answerCount, setAnswerCount] = useState([])

const getUnsortedAnswers = async () => {
  try {
    let res = await axios.get(`/api/questions/${props.match.params.id}/answers`)
    setAnswers(res.data)
  } catch (err) {
    console.log("getAnswers error", err)
  }
}

useEffect(()=>{
  getUnsortedAnswers();
  getAnswerCount();
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

const getAnswerCount = async () => {
  try {
    let res = await axios.get(`/api/answer_count/${props.match.params.id}`)
    setAnswerCount(res.data[0].count) 
  } catch(err) {
    console.log(err)
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
      <div style={styles.headerStuff}>
      <p style={styles.answerCount}>{answerCount} Answers </p>
      <div style={styles.toggleGrid}>
        <AnswerSort 
        sortBy={sortBy}
        setSortBy={setSortBy}
        getAnswers={getAnswers}/>
      </div>
      </div>
      {renderAnswers()}
      <br />
      <NewAnswer props={props} answers={answers} setAnswers={setAnswers}/>
      
    </div>
  );
};

const styles = {
  headerStuff: {
    marginTop: "33px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  toggleGrid: {
    marginRight: "193px",
    display: "flex",
    justifyContent: "right",
  },
  answerCount: {
    marginLeft: "137px",
    fontSize: "20px",
    fontWeight: "500px",
    fontFamily: "Lato"
  }
}

export default Answers;