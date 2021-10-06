import axios from "axios";
import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const EditAnswer = (props) => {
  const [body, setBody] = useState("")
  const [answer, setAnswer] = useState("")
  const { user } = useContext(AuthContext)



  const handleSubmit = async (e) =>{
    setAnswer({body: body, question_id: 7, user_id: user.id})
    e.preventDefault()
    try {
      console.log(body)
      let res = await axios.put("/api/answers", answer)
      console.log(res)
    } catch (err) {
      console.log(err)
    };
  }


  return(

      <Container>
      <h1>Edit Answer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>edit</Form.Label>
        <Form.Control 
        placeholder="Edit Answer"
        onChange={(e) => {
          setBody(e.target.value)}}/>
        </Form.Group>
      <Button type = "submit">
          Update
      </Button>
      </Form>
      </Container>

  )
}
export default EditAnswer;