import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import useAxiosOnMount from '../hooks/useAxiosOnMount';

const Answer = ({answer, deleteAnswer, id}) => {
// const { data: answer } = useAxiosOnMount(`/api/answers/${id}`)


  return (
    <div>
      <h1>Answer</h1>
      {/* {answer.body}
      <Button onClick={()=>deleteAnswer(answer.id)}>Delete</Button> */}
    </div>
  );
};

export default Answer;