import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"
import { Form, Button } from "react-bootstrap";
import { DPLButton } from "../DPLButtons";



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
        <DPLButton type="submit">SUBMIT</DPLButton>
      </Form>
    </div>
  )
}

export default NewQCommentForm