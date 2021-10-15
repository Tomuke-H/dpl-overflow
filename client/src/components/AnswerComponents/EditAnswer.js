import axios from "axios";
import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";

const EditAnswer = ({a, props}) => {
  const [body, setBody] = useState("")
  const [answer, setAnswer] = useState([])
  const { user } = useContext(AuthContext)



  const handleSubmit = async (e) =>{
    try {
      console.log("body:", body)
      console.log("answer:", answer)
      let res = await axios.put(`/api/questions/${props.match.params.id}/answers/${a.id}`, answer)
      setBody(res.data.body)
      console.log(res)
    } catch (err) {
      console.log(err)
    };
  }


  return(

      <Container>
      <h1>Edit Answer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>edit</Form.Label>
        <Form.Control 
        placeholder="Edit Answer"
        onChange={(e) => {
          setBody(e.target.value)}}/>
        </Form.Group>
      <Button type = "submit" onClick={()=>setAnswer({body: body, question_id: props.match.params.id, user_id: user.id})}>
          Update
      </Button>
      </Form>
      </Container>

  )
}
export default EditAnswer;