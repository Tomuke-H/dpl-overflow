import React, { useEffect, useState } from "react"
import axios from "axios"

const QuestionAuthor = ({id}) => {
  const [questionAuthor, setQuestionAuthor] = useState("")

useEffect(() => {
  getQuestionAuthor()
}, [])

const getQuestionAuthor = async () => {
  try{
    let res = await axios.get(`/api/question_author/${id}`)
    console.log("questionAuthor:", res.data[0].name)
    setQuestionAuthor(res.data[0].name)
  } catch(error) {
    console.log("Error getting question author", error)
  }
};

return(
    <h1 style={styles.Author}>
      {questionAuthor}
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

export default QuestionAuthor