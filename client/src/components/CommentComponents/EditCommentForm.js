import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EditCommentForm = ({updateComments, id, body, u, answer, showEdit, setShowEdit}) => {
  const { user } = useContext(AuthContext)
  const [commentBody, setCommentBody] = useState(body)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let comment = {
      id: id,
      body: commentBody,
      user_id: u.id,
      answer_id: answer.id
    }
    try {
      let res = await axios.put(`/api/comments/${id}`, comment)
      console.log(res);
      setShowEdit(!showEdit);
      updateComments(res.data)
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
        value={commentBody}
        label="Body"
        onChange={(e) => setCommentBody(e.target.value)}
        />
        <Button type="submit">Update Comment</Button>
      </Form>
    </div>
  )

}

export default EditCommentForm