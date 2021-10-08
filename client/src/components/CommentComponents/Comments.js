import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Comment from "./Comment"
import NewCommentForm from "./NewCommentForm";


// I anticipate that props passed into this file should/will be answer and user
const Comments = ({answer, comments, setComments, addComment, updateComments, deleteComment}) => {
  const {user} = useContext(AuthContext)
  // const history = useHistory();


  const renderComments = () => {
    return comments.map((comment) => {
      return(
        <Comment key={comment.id} comments={comments} deleteComment={deleteComment} updateComments={updateComments} comment={comment} answer={answer}/>
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