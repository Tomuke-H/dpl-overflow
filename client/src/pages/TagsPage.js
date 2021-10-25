import axios from "axios"
import React, { useEffect, useState } from "react"
import { Alert, Button, ButtonGroup, Card, Form } from "react-bootstrap"
import { useHistory } from "react-router"

const TagsPage = () => {
  const [tags, setTags] = useState([])
  const [tagSearch, setTagSearch] = useState([])
  const history = useHistory()

  useEffect(()=>{
    getTags();
  },[tagSearch]);

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
        <Card style={styles.gridChild} key={ind} onClick={()=> history.push('/dashboard', t)}>
          <Card.Title style={{border:"1px solid black", padding: "5px",margin:"10px"}}>{t.name}</Card.Title>
          <Card.Body>Tag description</Card.Body>
        </Card> 
      )
    })
  }
  const renderBadSearch = () => {
      return(
        <Alert variant="danger">No Results</Alert>
      )
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      let res = await axios.get(`/api/tag/${tagSearch}`)
      // console.log(res)
      if(res.data.length > 0){
        setTags(res.data)
      }else{
        setTags([])
      }
    } catch (err) {
      console.log(err)
    }}

  const reset = () =>{
    setTagSearch("")
    getTags()
  }

  const renderBelowHeader = () => {
    return(
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Control placeholder="Search"
            value = {tagSearch}
            onChange={(e) => {
            setTagSearch(e.target.value)}}/>
            <Button onClick={()=>{reset()}}>Reset Search</Button>
          </Form>
        <h3>Available tags</h3>
        </div>
        <div>
          <ButtonGroup>
            <Button>Sort</Button>
            <Button>Sort</Button>
            <Button>Sort</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }

  return(
    <div style={{margin:"10px", padding:"10px"}}>
      <h1 style={styles.header}>Tags</h1>
      {renderBelowHeader()}
      <div style={styles.grid}>
      {renderTags()}
      </div>
      {tags.length === 0 && renderBadSearch()}
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
  },

  header: {
    fontStyle: "normal",
    fontWeight: "500px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",

    color: "#000000",
  },


}



export default TagsPage