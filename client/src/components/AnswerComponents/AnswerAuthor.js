import React, { useEffect, useState } from "react"
import axios from "axios"

const AnswerAuthor = (id) => {
  const [answerAuthor, setAnswerAuthor] = useState("")

useEffect(() => {
  getAnswerAuthor()
}, [])

const getAnswerAuthor = async () => {
  try{
    let res = await axios.get(`/api/answer_author/${id}`)
    // console.log("answerAuthor:", res.data[0].name)
    setAnswerAuthor(res.data[0].name)
  } catch(error) {
    console.log("Error getting answer author", error)
  }
};

return(
    <h1 style={styles.Author}>
      {answerAuthor}
    </h1>
  )

}

const styles = {
  Author: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "14px",
    letterSpacing: "0.5px",
    color: "#000000"
  }
}

export default AnswerAuthor