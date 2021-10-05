import React, { useState } from "react"
import { Badge, } from "react-bootstrap"
import CreateTag from "../components/TagComponents/CreateTag"
import useAxiosOnMount from "../hooks/useAxiosOnMount"

const Tags = () => {
  const [show, setShow] = useState("false")
  const {data: tags, loading, error} = useAxiosOnMount("/api/tags")
  
  console.log(tags)

  const renderTags = () => {
    return tags.map((t,ind)=>{
      return(
        <a style={{fontSize: "large"}} key={ind}>
        <Badge pill variant="primary" >
          {t.name}
        </Badge> 
        </a>
      )
    })
  }

  const addTag = () => {
    return(
      <CreateTag/>
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