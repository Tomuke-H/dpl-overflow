import React, { useContext} from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Comment from "./Comment"
import CommentAuthor from "./CommentAuthor";


// I anticipate that props passed into this file should/will be answer and user
const Comments = ({answer, comments, addComment, updateComments, deleteComment}) => {
  // const {user} = useContext(AuthContext)
  // const history = useHistory();


  const renderComments = () => {
    return comments.map((comment) => {
      return(
        <div 
        style={styles.commentContainer}
        key = {comment.id}>
            <CommentAuthor id={comment.id}/>
        <Comment key={comment.id} comments={comments} deleteComment={deleteComment} updateComments={updateComments} comment={comment} answer={answer}/>
        </div>
      )
    })
  }

  return (
    <>
    {renderComments()}
    </>
  )
}

const styles = {
  commentContainer: {
    marginLeft: "207px",
    marginRight: "285px",
    paddingTop: "28px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
}

export default Comments