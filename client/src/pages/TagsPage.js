import axios from "axios"
import React, { useEffect, useState } from "react"
import { Badge, } from "react-bootstrap"
import CreateTag from "../components/TagComponents/CreateTag"

const Tags = () => {
  const [tags, setTags] = useState([])

  useEffect(()=>{
    console.log("in UseEffect")
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
        <div style={{fontSize: "large"}} key={ind}>
        <Badge pill variant="primary" >
          {t.name}
          <a style={{backgroundColor:"black", marginLeft:".25em", padding:".25em", borderRadius:"1em"}} onClick={()=>deleteTag(t.id)}>x</a>
        </Badge> 
        </div>
      )
    })
  }

  return(
    <div>
      <h1>Tags</h1>
      {renderTags()}
    </div>
  )
}

export default Tags