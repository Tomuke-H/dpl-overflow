import axios from "axios"
import React, { useEffect, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router"
import { TagPagePill } from "../components/TagComponents/TagPill"

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
        <div style={styles.gridChild} key={ind} onClick={()=> history.push('/dashboard', t)}>
          <TagPagePill>{t.name}</TagPagePill>
          <p style={styles.descript}>Tag description</p>
        </div> 
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

  const renderSearch = () => {
    return(
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"self-end"}}>
        <div>
          <Form style={{alignContent:"right"}} onSubmit={handleSubmit}>
            <Form.Control placeholder="Search"
            value = {tagSearch}
            onChange={(e) => {
            setTagSearch(e.target.value)}}/>
            <Button onClick={()=>{reset()}}>Reset Search</Button>
          </Form>
        </div>
      </div>
    )
  }

  return(
    <div style={{margin:"60px 90px 0px 90px", padding:"10px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
      <h1 style={styles.header}>Tags</h1>
      {renderSearch()}
      </div>
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
    margin: "80px 0px 0px 0px",
    border: "2px solid black",
    borderRadius:"5px",
    backgroundColor:"#ffffff",
    padding: "20px 40px 20px 40px",
    minWidth: '663px', 
    minHeight: '464px'
  },

  gridChild:{
    margin: "5px",
    border:"2px solid #6E54A3",
    flexBasis: `calc(100% / 4 - 10px)`,
    textTransform: "capitalize",
    borderRadius: "5px",
  },

  header: {
    fontWeight: "500px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  
  descript: {
    margin: "10px",
    color: "#000000",
  },


}



export default TagsPage