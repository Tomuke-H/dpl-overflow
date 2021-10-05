import React from "react"
import Comments from "./Comments"

const Comment = ({comments, id, body, answer, user, deleteComment}) => {

  return(
    <div style={{margin: "66px"}}>
{/* <p>{answer.body}</p> */}
<h6>{user.name}</h6>
<p>{body}</p>
<button onClick={()=>deleteComment(id)}>Delete Comment</button> 
</div>
  )
}



export default Comment