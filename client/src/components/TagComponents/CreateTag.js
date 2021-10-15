import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {useHistory} from "react-router-dom"
import Tags from "../../pages/Tags";
import DPLButton from "../DPLButton";


const CreateTag = ({setCreated}) => {
  const [name, setName] = useState("")
  let history = useHistory()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      let res = await axios.post("/api/tags", {name})
      setCreated(true)
      setName("")
    } catch (err) {
      console.log(err)
    }}


  return(

      <Container>
      <h1>Create a Tag</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Tag Name</Form.Label>
        <Form.Control 
        placeholder="Enter Tag Name" 
        value = {name}
        onChange={(e) => {
          setName(e.target.value)}}/>
        </Form.Group>
      <DPLButton type = "submit">
          SUBMIT
      </DPLButton>
      </Form>
      </Container>

  )
}
export default CreateTag