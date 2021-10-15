import React, { useContext, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider";
import EditCommentForm from "./EditCommentForm";

const Comment = ({comment, answer, deleteComment, updateComments}) => {
const [showEdit, setShowEdit] = useState(false);
const { user } = useContext(AuthContext);

const showEditDelete = () => {
  if (comment.user_id === user.id) {
    return (
      <div style={styles.cdContainer}>
      <p style={{margin: "10px"}} onClick={()=>deleteComment(comment.id)}>Delete Comment</p>  
      <p style={{margin: "10px"}} onClick={()=>setShowEdit(!showEdit)}> {!showEdit ? "Edit Comment" : "Cancel" }</p>  
      {showEdit && <EditCommentForm updateComments={updateComments} c={comment} showEdit={showEdit} setShowEdit={setShowEdit} answer={answer}/>
      }
      </div>
    )
  }
}
  

  return(
    <div style={styles.comment}>
      <p>{comment.body}</p>
      <p>{comment.created_at}</p>
      {showEditDelete()}
    </div>
  )
}

const styles = {
  cdContainer: {
    display: "flex",
    flexDirection: "row",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    marginTop: "30px",
  },
  comment: {
    marginLeft: "20px",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500",
  }
}


export default Comment