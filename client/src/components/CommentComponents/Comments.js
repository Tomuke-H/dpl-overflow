import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Comment from "./Comment"
import NewCommentForm from "./NewCommentForm";
import { Card } from 'react-bootstrap'


// I anticipate that props passed into this file should/will be answer and user
const Comments = ({answer, comments, addComment, updateComments, deleteComment}) => {
  const {user} = useContext(AuthContext)
  // const history = useHistory();


  const renderComments = () => {
    return comments.map((comment) => {
      return(
        <Card.Footer className="text-muted">
        <Comment key={comment.id} comments={comments} deleteComment={deleteComment} updateComments={updateComments} comment={comment} answer={answer}/>
        </Card.Footer>
      )
    })
  }

  return (
    <>
    {renderComments()}
    <NewCommentForm answer={answer} addComment={addComment}/>
    </>
  )
}

export default Comments