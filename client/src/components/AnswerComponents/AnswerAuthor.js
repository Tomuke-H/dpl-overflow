import React, { useEffect, useState } from "react"
import axios from "axios"

const AnswerAuthor = ({answer}) => {
  const [answerAuthor, setAnswerAuthor] = useState("")
  console.log("ID HERE", answer.id)

useEffect(() => {
  getAnswerAuthor()
}, [])

const getAnswerAuthor = async () => {
  try{
    let res = await axios.get(`/api/answer_author/${answer.id}`)
    console.log("answerAuthor:", res.data[0].name)
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
    fontSize: "16px",
    letterSpacing: "0.5px",
    color: "#000000"
  }
}

export default AnswerAuthor