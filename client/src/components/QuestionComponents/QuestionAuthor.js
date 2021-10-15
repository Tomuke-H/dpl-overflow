import { useEffect, useState } from "react"
import axios from "axios"

const QuestionAuthor = (id) => {
  const [questionAuthor, setQuestionAuthor] = useState("")

useEffect(() => {
  getQuestionAuthor()
}, [])

const getQuestionAuthor = async () => {
  try{
    let res = await axios.get(`/api/question_author/${id}`)
    setQuestionAuthor(res.data[0].name)
  } catch(error) {
    console.log("Error getting question author", error)
  }
};

return `${questionAuthor}`

}

export default QuestionAuthor