import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Question = ({props}) => {
  const [question, setQuestion] = useState(null)

  const getQuestion = async () => {
    try {
      let res = await axios.get(`/api/questions/${props.match.params.id}`)
      setQuestion(res.data)
    }catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getQuestion()
  },[])

  const renderQuestion = () => {
    if(!question){
      return(
        <h2>Question Not Found</h2>
      )
    }
    return(
      <div>
        <h2>{question.title}</h2>
        <h2>{question.body}</h2>
      </div>
    )
  }
  return (
    <div>
      {renderQuestion()}
    </div>
  )
}

export default Question;