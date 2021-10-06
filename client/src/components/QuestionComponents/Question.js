import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

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

  const deleteQuestion = async (id) => {
    try{
      let res = await axios.delete(`/api/questions/${id}`)
      setQuestion(null)
    }catch (err) {
      console.log(err)
    }
  }

  const renderQuestion = () => {
    if(!question){
      return(
        <h2>404 Question Not Found</h2>
      )
    }
    return(
      <Container>
        <h2>{question.title}</h2>
        <h2>{question.body}</h2>
        <Button type="submit" onClick={()=>deleteQuestion(question.id)}>Delete</Button>
      </Container>
    )
  }
  return (
    <div>
      {renderQuestion()}
    </div>
  )
}

export default Question;