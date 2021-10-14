import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Comment from "./Comment"
import NewCommentForm from "./NewCommentForm";
import { Card, Container } from 'react-bootstrap'
import CommentAuthor from "./CommentAuthor";


// I anticipate that props passed into this file should/will be answer and user
const Comments = ({answer, comments, setComments, addComment, updateComments, deleteComment}) => {
  const {user} = useContext(AuthContext)
  // const history = useHistory();


  const renderComments = () => {
    return comments.map((comment) => {
      return(
        <Container 
        style={styles.commentContainer}
        key = {comment.id}>
            <CommentAuthor id={comment.id}/>
        <Comment key={comment.id} comments={comments} deleteComment={deleteComment} updateComments={updateComments} comment={comment} answer={answer}/>
        </Container>
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

const styles = {
  commentContainer: {
    marginLeft: "207px",
    borderTop: "1px solid rgba(0, 0, 0, 0.3)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "row"
  },
}

export default Comments