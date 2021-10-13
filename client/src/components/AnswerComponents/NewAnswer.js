import axios from "axios";
import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import MarkdownEditor from "../Markdown/MarkdownEditor";

const NewAnswer = ({props}) => {
  const [body, setBody] = useState("")
  // const [answer, setAnswer] = useState({body: , question_id: ,})
  const { user } = useContext(AuthContext)



  const handleSubmit = async (e) =>{
    let answer = { 
      body: body,
      question_id: props.match.params.id,
      user_id: user.id
    }
    // e.preventDefault()
    try {
      console.log(body)
      let res = await axios.post(`/api/questions/${props.match.params.id}/answers`, answer)
      console.log(res)
    } catch (err) {
      console.log(err)
    };
  }


  return(

      <Container>
      <h1>New Answer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Answer...</Form.Label>
        <MarkdownEditor
          body = {body}
          setBody = {setBody}
          />
        </Form.Group>
      <Button type = "submit">
          Add
      </Button>
      </Form>
      </Container>

  )
}
export default NewAnswer;