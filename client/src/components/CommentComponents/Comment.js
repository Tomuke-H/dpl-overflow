import axios from "axios";
import React, { useContext, useState } from "react"
import { Button } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import EditCommentForm from "./EditCommentForm";

const Comment = ({id, body, answer, user_id, updateComments, deleteComment}) => {
const [showEdit, setShowEdit] = useState(false);
const { user } = useContext(AuthContext);


  const showEditDelete = () => {
    console.log("user", user)
    if(user_id === user.id) {
      return (
        <>
        <Button onClick={()=>deleteComment(id)}>Delete Comment</Button>  
        <Button onClick={()=>setShowEdit(!showEdit)}> {!showEdit ? "Edit Comment" : "Cancel" }</Button>  
        {/* {showEdit && <EditCommentForm updateComments={updateComments} id={id} body={body} answer={answer} u={u} showEdit={showEdit} setShowEdit={setShowEdit}/>
        } */}
        </>
      )
    }
  }



  return(
    <div style={{margin: "66px"}}>
      {/* <h6>{u.name}</h6> */}
      <p>{body}</p>
      {/* <Button onClick={()=>deleteComment(id)}>Delete Comment</Button>  
      <Button onClick={()=>setShowEdit(!showEdit)}> {!showEdit ? "Edit Comment" : "Cancel" }</Button>   */}
      {showEdit && <EditCommentForm updateComments={updateComments} id={id} body={body} answer={answer} user_id = {user_id} showEdit={showEdit} setShowEdit={setShowEdit}/>}
      {showEditDelete()}
    </div>
  )
}



export default Comment