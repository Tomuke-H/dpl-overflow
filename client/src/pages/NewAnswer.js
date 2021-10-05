import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const NewAnswer = () => {
  // const [body, setBody] = useState(null)
  // const [answer, setAnswer] = useState(null)

  // const handleSubmit = async (e, {value}) => {
  //   e.preventDefault();
  //   try {
  //     let res = await axios.post("/api/answers")
  //     console.log(res.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div>
      <h1>Form here</h1>
      {/* <Form onSubmit={handleSubmit}>
        <Form.Label>Body</Form.Label>
        <Form.Control type="text" placeholder="Enter answer here..." value={body} onChange={(e, {value}) => {
          setBody(value);
        }}/>
        <Button type="submit" variant="primary">Done</Button>
      </Form> */}
    </div>
  );
};

export default NewAnswer;