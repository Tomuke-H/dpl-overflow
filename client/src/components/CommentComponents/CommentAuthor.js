import React, { useEffect, useState } from "react"
import axios from "axios"

const CommentAuthor = ({id}) => {
  const [commentAuthor, setCommentAuthor] = useState("")

useEffect(() => {
  getCommentAuthor()
}, [])

const getCommentAuthor = async () => {
  try{
    let res = await axios.get(`/api/comment_author/${id}`)
    // console.log("commentAuthor:", res.data[0].name)
    setCommentAuthor(res.data[0].name)
  } catch(error) {
    console.log("Error getting comment author", error)
  }
};

return(
    <h1 style={styles.commentAuthor}>
      {commentAuthor}
    </h1>
  )

}

const styles = {
  commentAuthor: {
    fontFamily: "Lato",
    fontWeight: "500px",
    fontSize: "16px",
    letterSpacing: "0.5px",
    color: "#000000"
  }
}

export default CommentAuthor