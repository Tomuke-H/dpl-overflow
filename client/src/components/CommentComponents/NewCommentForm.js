import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"
import { Form } from "react-bootstrap";
import { DPLButton } from "../DPLButtons";



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
        as="textarea"
        size="sm"
        value={commentBody}
        label="Body"
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder={"Add a comment!"}
        />
        <DPLButton type="submit">SUBMIT</DPLButton>
      </Form>
    </div>
  )
}

export default NewCommentForm