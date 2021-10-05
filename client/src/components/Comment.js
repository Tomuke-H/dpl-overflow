import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

// I anticipate that props passed into this file should/will be answer and user

const Comment = () => {
  const [comments, setComments] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () => {
    try{
      let res = await axios.get(`/api/comments/`)
      console.log("comments:", res.data)
    } catch(error) {

    }
  }

  return (
    <>
    </>
  )
}

export default Comment