import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const CreateTag = () => {
  const [name, setName] = useState("")


  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      console.log(name)
      let res = await axios.post("/api/tags", {name})
      console.log(res)
    } catch (err) {
      console.log(err)
    };
  }


  return(

      <Container>
      <h1>Create a Tag</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Tag Name</Form.Label>
        <Form.Control 
        placeholder="Enter Tag Name" 
        onChange={(e) => {
          setName(e.target.value)}}/>
        </Form.Group>
      <Button type = "submit">
          Submit
      </Button>
      </Form>
      </Container>

  )
}
export default CreateTag