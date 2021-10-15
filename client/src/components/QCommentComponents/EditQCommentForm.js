import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EditQCommentForm = ({updateQComments, question, qc, showEdit, setShowEdit}) => {
  const { user } = useContext(AuthContext)
  const [qcommentBody, setQCommentBody] = useState(qc.body)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let qcomment = {
      id: qc.id,
      body: qcommentBody,
      user_id: user.id,
      question_id: question.id
    }
    try {
      let res = await axios.put(`/api/questions/${question.id}/qcomments/${qc.id}`, qcomment)
      // console.log(res);
      setShowEdit(!showEdit);
      updateQComments(res.data)
    } catch(err) {
      console.log("Edit QComment Submission Error", err)
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
        value={qcommentBody}
        label="Body"
        onChange={(e) => setQCommentBody(e.target.value)}
        />
        <Button type="submit">Update Comment</Button>
      </Form>
    </div>
  )

}

export default EditQCommentForm