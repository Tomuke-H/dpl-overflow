import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {useHistory} from "react-router-dom"
// import Tags from "../../pages/Tags";
import{ DPLButton } from "../DPLButtons";
import TagErrorMessage from "./TagErrorMessage";


const CreateTag = ({handleClose, tags, setTags, selectedValues, setSelectedValues, setShowTagModal, checkedItems, setCheckedItems}) => {
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) =>{
    setError(null)
    e.preventDefault()
    try {
      let res = await axios.post("/api/tags", {name})
      setShowTagModal(false)
      setSelectedValues([res.data, ...selectedValues])
      setCheckedItems([res.data, ...checkedItems])
      setTags([res.data, ...tags])
    } catch (err) {
      setError(`The tag ${name} already exists`)
    }}


  return(
    <div>
      {error && <TagErrorMessage err={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control 
            placeholder="Enter Tag Name" 
            value = {name}
            onChange={(e) => {
              setName(e.target.value)}}
              />
        </Form.Group>
        <div style={styles.buttonWrapper}>
          <DPLButton type ="submit">
              Add Tag
          </DPLButton>
        </div>
      </Form>
    </div>
  )
}

const styles= {
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '5px'
  }
}
export default CreateTag