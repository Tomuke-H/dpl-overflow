import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { DPLButton } from "../DPLButtons";
import MarkdownEditor from "../Markdown/MarkdownEditor";

const EditAnswer = ({a, props}) => {
  const [body, setBody] = useState(a.body)
  const [answer, setAnswer] = useState([])
  const { user } = useContext(AuthContext)
  const history = useHistory();



  const handleSubmit = async (e) =>{
    try {
      // console.log("body:", body)
      // console.log("answer:", answer)
      let res = await axios.put(`/api/questions/${props.match.params.id}/answers/${a.id}`, answer)
      setBody(res.data.body)
      // console.log(res)
    } catch (err) {
      console.log("Edit Answer Submission Error", err)
    };
  }


  return(

      <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <MarkdownEditor
          body = {body}
          setBody = {setBody}
          />
        </Form.Group>
      <DPLButton type = "submit" onClick={()=>setAnswer({body: body, question_id: props.match.params.id, user_id: user.id})}>
          SUBMIT
      </DPLButton>
      </Form>
      </Container>

  )
}
export default EditAnswer;