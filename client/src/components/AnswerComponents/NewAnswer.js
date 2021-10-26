import axios from "axios";
import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import { DPLButton } from "../DPLButtons";
import MarkdownEditor from "../Markdown/MarkdownEditor";

const NewAnswer = ({props, answers, setAnswers}) => {
  const [body, setBody] = useState("")
  // const [answer, setAnswer] = useState({body: , question_id: ,})
  const { user } = useContext(AuthContext)



  const handleSubmit = async (e) =>{
    let answer = { 
      body: body,
      question_id: props.match.params.id,
      user_id: user.id
    }
    e.preventDefault()
    try {
      // console.log(body)
      let res = await axios.post(`/api/questions/${props.match.params.id}/answers`, answer)
      console.log(res)
      setAnswers([...answers, res.data])
      setBody("")
    } catch (err) {
      console.log("New Answer Submission Error", err)
    };
  }


  return(

      <Container>
      <h1 style={styles.yourAnswer}>Your Answer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <MarkdownEditor
          body = {body}
          setBody = {setBody}
          />
        </Form.Group>
      <DPLButton
      type = "submit">
          SUBMIT
      </DPLButton>
      </Form>
      </Container>

  )
}

const styles = {
  yourAnswer: {
    fontWeight: "500px",
    fontSize: "20px",
    letterSpacing: "0.5px",
  }
}

export default NewAnswer;