import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios";
import { Form, Button } from "react-bootstrap";



const NewQCommentForm = ({question, addQComment}) => {
const [qcommentBody, setQCommentBody] = useState ("")
const { user } = useContext(AuthContext)

let qcomment = {
  body: qcommentBody,
  user_id: user.id,
  question_id: question.id
}

const handleSubmit = (e, qcomment) => {
    addQComment(e, qcomment);
    setQCommentBody("");
}

  return (
    <div>
      <Form onSubmit={(e)=>{handleSubmit(e, qcomment)}}>
      {/* <Form> */}
        <Form.Control
        value={qcommentBody}
        label="Body"
        onChange={(e) => setQCommentBody(e.target.value)}
        placeholder={"Add a comment!"}
        />
        <Button type="submit">Submit Comment</Button>
      </Form>
    </div>
  )
}

export default NewQCommentForm