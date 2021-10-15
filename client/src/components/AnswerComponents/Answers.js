import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import NewAnswer from './NewAnswer';

const Answers = ({props}) => {
const [answers, setAnswers] = useState([])

// const getDataByTag = async (t, p) => {
//   setSortBy('tag')
//   try{
//     let res = await axios.get(`/api/find_questions_by_tag/${t}?page=${p}`)
//     setStates(res.data, p)
//   } catch (err){
//     console.log(err)
//   }
// }

// const getDataByUnanswered = async (p) => {
//   setSortBy('unanswered')
//   setTagSearch([])
//   try{
//     let res = await axios.get(`/api/unanswered_questions?page=${p}`)
//     setStates(res.data, p)
//   }catch(err){
//     console.log(err)
//   }
// }

// const getAllData = async (p) => {
//   setSortBy('all')
//   setTagSearch([])
//   try{
//     let res = await axios.get(`/api/questions?page=${p}`)
//     setStates(res.data, p)
//   }catch(err){
//     console.log(err)
//   }
// }

// const getDataSearch = async (p, t) => {
//   setSearch(t)
//   setSortBy('search')
//   try{
//     let res = await axios.get(`/api/question_search?page=${p}&body=${t}`)
//     setStates(res.data, p)
//   }catch(err){
//     console.log(err)
//   }
// }

// const getQuestions = (sC, p, t) => {
//   switch (sC){
//     case "all" :
//       setShowTags(false)
//       getAllData(p)
//       break;
//     case "tag" :
//       getDataByTag(t, p)
//       break;
//     case "unanswered" :
//       setShowTags(false)
//       getDataByUnanswered(p)
//       break;
//     case "search":
//       getDataSearch(p, t)
//       break;
//     default:
//       alert('Unsupported search method')
//       break;
//   }
// }

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