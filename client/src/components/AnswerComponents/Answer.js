import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import EditAnswer from './EditAnswer'

const Answer = (props) => {
  const [answer, setAnswer] = useState(null)

  const getAnswer = async () => {
    try {
      let res = await axios.get(`/api/answers/${props.match.params.id}`)
      console.log(res.data)
      setAnswer(res.data)
    }catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getAnswer()
  },[])

  const deleteAnswer = async (id) => {
    try{
      let res = await axios.delete(`/api/answers/${id}`)
      setAnswer(null)
    }catch (err) {
      console.log(err)
    }
  }

  const renderAnswer = () => {
    if(!answer){
      return(
        <h2>There are no answers</h2>
      )
    }
    return(
      <div>
        <h2>{answer.body}</h2>
        <Button type="submit" onClick={()=>deleteAnswer(answer.id)}>Delete</Button>
      </div>
    )
  }
  return (
    <div>
      {renderAnswer()}
      <EditAnswer a = {answer}/>
    </div>
  )
}

export default Answer;