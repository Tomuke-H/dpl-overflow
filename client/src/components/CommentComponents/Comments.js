import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Comment from "./Comment"
import NewCommentForm from "./NewCommentForm";


// I anticipate that props passed into this file should/will be answer and user
const Comments = ({answer, comments, setComments, addComment, updateComments}) => {
  const {user} = useContext(AuthContext)
  // const history = useHistory();


  const deleteComment = async (id) => {
    try{
      await axios.delete(`/api/answers/${answer.id}/comments/${id}`)
      const filterComments = comments.filter((comment) => comment.id !== id);
      setComments(filterComments)
    } catch {
      alert("Ah shucks.  I don't know what I'm trying to do, but clearly it ain't workin.")
    }
  }

  const renderComments = () => {
    return comments.map((comment) => {
      return(
        <Comment key={comment.id} comments={comments} deleteComment={deleteComment} updateComments={updateComments} id={comment.id} body={comment.body} answer={comment.answer} u={comment.user} />
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