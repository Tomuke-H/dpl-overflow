import React, { useEffect, useState } from "react"
import axios from "axios"

const QCommentAuthor = ({id}) => {
  const [qcommentAuthor, setQCommentAuthor] = useState("")

useEffect(() => {
  getQCommentAuthor()
}, [])

const getQCommentAuthor = async () => {
  try{
    let res = await axios.get(`/api/qcomment_author/${id}`)
    // console.log("commentAuthor:", res.data[0].name)
    setQCommentAuthor(res.data[0].name)
  } catch(error) {
    console.log("Error getting Qcomment author", error)
  }
};

return(
    <h1 style={styles.commentAuthor}>
      {qcommentAuthor}
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

export default QCommentAuthor