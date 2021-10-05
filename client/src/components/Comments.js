import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Comment from "./Comment"


// I anticipate that props passed into this file should/will be answer and user
const Comments = () => {
  const [comments, setComments] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () => {
    try{
      //will need to edit routes.rb and axios call to be user and answer specific but for testing purposes this works
      let res = await axios.get(`/api/comments/`)
      console.log("comments:", res.data)
      setComments(res.data)
    } catch(error) {
      alert("error getting comments, but that sounds like a YOU problem")
    }
  };

  const deleteComment = async (id) => {
    try{
      await axios.delete(`/api/commments/${id}`)
      const filterComments = comments.filter((comment) => comment.id !== id);
      setComments(filterComments)
    } catch {
      alert("Ah shucks.  I don't know what I'm trying to do, but clearly it ain't workin.")
    }
  }

  const renderComments = () => {
    return comments.map((comment) => {
      return(
        <Comment key={comment.id} comments={comments} deleteComment={deleteComment} {...comment}/>
      )
    })
  }

  return (
    <>
    {renderComments()}
    </>
  )
}

export default Comments