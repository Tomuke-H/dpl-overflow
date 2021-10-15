import axios from "axios";
import React, { useContext, useState } from "react"
import { Button, Card } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import EditQCommentForm from "./EditQCommentForm";

const QComment = ({qcomment, question, deleteQComment, updateQComments}) => {
const [showEdit, setShowEdit] = useState(false);
const { user } = useContext(AuthContext);

const showEditDelete = () => {
  if (qcomment.user_id === user.id) {
    return (
      <div style={styles.cdContainer}>
      <p style={{margin: "10px"}} onClick={()=>deleteQComment(qcomment.id)}>Delete Comment</p>  
      <p style={{margin: "10px"}} onClick={()=>setShowEdit(!showEdit)}> {!showEdit ? "Edit Comment" : "Cancel" }</p>  
      {showEdit && <EditQCommentForm updateQComments={updateQComments} qc={qcomment} showEdit={showEdit} setShowEdit={setShowEdit} question={question}/>
      }
      </div>
    )
  }
}
  

  return(
    <div style={styles.comment}>
      <p>{qcomment.body}</p>
      <p>{qcomment.created_at}</p>
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


export default QComment