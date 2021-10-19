import axios from "axios"
import React, { useEffect, useState } from "react"
import { Badge, } from "react-bootstrap"
import CreateTag from "../components/TagComponents/CreateTag"

const Tags = () => {
  const [tags, setTags] = useState([])
  const [created, setCreated] = useState(false)

  useEffect(()=>{
    setCreated(false)
    getTags();
  },[created]);

  const getTags = async () => {
    try {
      let res = await axios.get("/api/tags")
      setTags(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const deleteTag = async (id) => {
    try {
      let res = await axios.delete(`/api/tags/${id}`)
      let tag = tags.filter((t) => t.id !== id)
      setTags(tag)
    } catch (error) {
      console.log(error)
    }
  }
  const renderTags = () => {
    return tags.map((t,ind)=>{
      return(
        <div style={{fontSize: "large"}} key={ind}>
        <Badge pill variant="primary" >
          {t.name}
          <a style={{backgroundColor:"black", marginLeft:".25em", padding:".25em", borderRadius:"1em"}} onClick={()=>deleteTag(t.id)}>x</a>
        </Badge> 
        </div>
      )
    })
  }

  const addTag = () => {
    return(
      <CreateTag
      setCreated = {setCreated}
      />
    )
  }

  return(
    <div>
      <h1>Tags</h1>
      {renderTags()}
      {addTag()}
    </div>
  )
}

export default Tags