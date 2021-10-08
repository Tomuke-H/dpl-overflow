import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios";
import { Form, Button } from "react-bootstrap";



const NewCommentForm = ({answer, addComment}) => {
const [commentBody, setCommentBody] = useState ("")
const { user } = useContext(AuthContext)

let comment = {
  body: commentBody,
  user_id: user.id,
  answer_id: answer.id
}

const handleSubmit = (e, comment) => {
    addComment(e, comment);
    setCommentBody("");
}

  return (
    <div>
      <Form onSubmit={(e)=>{handleSubmit(e, comment)}}>
      {/* <Form> */}
        <Form.Control
        value={commentBody}
        label="Body"
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder={"Add a comment!"}
        />
        <Button type="submit">Submit Comment</Button>
      </Form>
    </div>
  )
}

export default NewCommentForm