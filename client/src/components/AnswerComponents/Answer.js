import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import EditAnswer from './EditAnswer'

const Answer = ({answer, props, deleteAnswer}) => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false)

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
      <Button onClick={()=>setShowForm(!showForm)}>Edit</Button>
      {showForm && <EditAnswer a = {answer} props = {props}/>}
    </div>
  )
}

export default Answer;