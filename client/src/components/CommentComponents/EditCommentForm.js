import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios";
import { Form } from "react-bootstrap";
import { DPLButton } from "../DPLButtons";

const EditCommentForm = ({updateComments, answer, c, showEdit, setShowEdit}) => {
  const { user } = useContext(AuthContext)
  const [commentBody, setCommentBody] = useState(c.body)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let comment = {
      id: c.id,
      body: commentBody,
      user_id: user.id,
      answer_id: answer.id
    }
    try {
      let res = await axios.put(`/api/answers/${answer.id}/comments/${c.id}`, comment)
      // console.log(res);
      setShowEdit(!showEdit);
      updateComments(res.data)
    } catch(err) {
      console.log("Edit Comment Submission Error", err)
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
        as="textarea"
        value={commentBody}
        label="Body"
        onChange={(e) => setCommentBody(e.target.value)}
        />
        <DPLButton type="submit">
          SUBMIT
        </DPLButton>
      </Form>
    </div>
  )

}

export default EditCommentForm