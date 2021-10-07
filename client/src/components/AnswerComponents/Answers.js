import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useAxiosOnMount from '../../hooks/useAxiosOnMount';
import Answer from './Answer';
import EditAnswer from './EditAnswer';
import NewAnswer from './NewAnswer';

const Answers = ({props}) => {
const [answers, setAnswers] = useState([])


const getAnswers = async () => {
  try {
    let res = await axios.get(`/api/questions/${props.match.params.id}/answers`)
    setAnswers(res.data)
  } catch (err) {
    console.log(err)
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
    console.log(err)
  }
}

// const renderAnswers = () => {
//   return answers.map (a => {
//     return (
//       <div>
//         <h3>{a.body}</h3>
//         <Link to= {`/answers/${a.id}`}>
//           <Button></Button>
//         </Link>
//         <Button onClick={()=>deleteAnswer(a.id)}>Delete</Button>
//       </div>
//     )
//   })
// }
const renderAnswers = () => {
  return answers.map (a => {
    return (
      <Answer answer = {a} props = {props} deleteAnswer = {deleteAnswer}/>
    )
  })
}
  return (
    <div>
      <h1>Answers</h1>
      {renderAnswers()}
      <br />
      <NewAnswer props = {props}/>
      
    </div>
  );
};

export default Answers;