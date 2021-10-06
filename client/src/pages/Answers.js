import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAxiosOnMount from '../hooks/useAxiosOnMount';
import Answer from './Answer';
import EditAnswer from './EditAnswer';
import NewAnswer from './NewAnswer';

const Answers = () => {
const {data: answers, setData: setAnswers} = useAxiosOnMount("/api/answers")

const deleteAnswer = async (id) => {
  try {
    let res = await axios.delete(`/api/answers/${id}`)
    let newAnswers = answers.filter((a) => a.id !== id)
    setAnswers(newAnswers)
  } catch (err) {
    console.log(err)
  }
}

const renderAnswers = () => {
  return answers.map (a => {
    return (
      <div>
        <h3>{a.body}</h3>
        <Link to= {`/answers/${a.id}`}>
          <Button>Show</Button>
        </Link>
        <Button onClick={()=>deleteAnswer(a.id)}>Delete</Button>
      </div>
    )
  })
}

  return (
    <div>
      <h1>Answers</h1>
      {renderAnswers()}
      <br />
      <NewAnswer />
    </div>
  );
};

export default Answers;