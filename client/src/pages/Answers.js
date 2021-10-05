import axios from 'axios';
import React, { useState } from 'react';
import useAxiosOnMount from '../hooks/useAxiosOnMount';
import Answer from './Answer';

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

  return (
    <div>
      <h1>All Answers</h1>
      {answers.map((a) => {
        return (
        <Answer key = {a.id} answer = {a} deleteAnswer = {deleteAnswer}/>
        )
      })}
    </div>
  );
};

export default Answers;