import axios from "axios"
import React, { useEffect, useState } from "react"
import { Badge, Card, CardGroup, Col, Form, Row, } from "react-bootstrap"

const TagsPage = () => {
  const [tags, setTags] = useState([])

  useEffect(()=>{
    getTags();
  },[]);

  const getTags = async () => {
    try {
      let res = await axios.get("/api/tags")
      setTags(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTags = () => {
    return tags.map((t,ind)=>{
      return(
        <Card style={styles.gridChild} key={ind}>
          <Card.Title style={{border:"1px solid black", padding: "5px",margin:"10px"}}>{t.name}</Card.Title>
          <Card.Body>Tag description</Card.Body>
        </Card> 
      )
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      
    } catch (err) {
      console.log(err)
    }}

  const renderBelowHeader = () => {
    return(
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <div>
      <h3>Available tags</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Search</Form.Label>
        <Form.Control placeholder="Search Tags"/>
      </Form>
      </div>
      <div>
        Grid thingys
      </div>
      </div>
    )
  }

  return(
    <div style={{margin:"10px", padding:"10px"}}>
      <h1>Tags</h1>
      {renderBelowHeader()}
      <div style={styles.grid}>
      {renderTags()}
      </div>
    </div>
  )
}

const styles ={
  grid:{
    display:"flex",
    flexWrap:"wrap",
    margin: "20px"
  },

  gridChild:{
    margin: "5px",
    flexBasis: `calc(100% / 4 - 10px)`,
  }
}

export default TagsPage