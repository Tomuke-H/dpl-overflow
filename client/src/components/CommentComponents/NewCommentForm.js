import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios";
import { Form, Button } from "react-bootstrap";


//comment form will be an option at the bottom of each answer

const NewCommentForm = () => {
const [commentBody, setCommentBody] = useState ("")
const { user } = useContext(AuthContext)
const history = useHistory();

  const addComment = async (e) => {
    e.preventDefault()
    let comment = { 
      body: commentBody,
      user_id: user.id,
      answer_id: 7
      //DO NOT FORGET TO CHANGE THIS TO BE answer.id  OR SOMETHING!
      //answer should be passed in as props but until we get that working,
      //I am just hardcoding it at 7.
    };
    console.log(comment)
    try {
      await axios.post("/api/comments/", comment)
      history.push("/comments")
    } catch(err) {
      console.log(err)
      alert("somethin ain't right...")
    }
  }



  return (
    <div>
      <Form onSubmit={addComment}>
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