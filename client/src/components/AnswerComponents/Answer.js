import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import EditAnswer from './EditAnswer'

const Answer = ({answer, props, deleteAnswer}) => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(AuthContext)
  const [showEdit, setShowEdit] = useState(false)

  const renderAnswer = () => {
    if(!answer){
      return(
        <h2>There are no answers</h2>
      )
    }
    return(
      <div>
        <h2>{answer.body}</h2>
      </div>
    )
  }

  const showEditForm = () => {
  return (<Button onClick={()=>setShowForm(!showForm)}>Edit</Button>
  )}


  const userEdit = () => {
    if (answer.user_id === user.id) {
      return showEditForm()
    } else {
      console.log("not your answer")
    }
  }

  const userDelete = ()n => {
    return (
      <p>nothing</p>
    )
  }

  return (
    <div>
      {renderAnswer()}
      <Button type="submit" onClick={()=>deleteAnswer(answer.id)}>Delete</Button>
      {userEdit()}
      {showForm && <EditAnswer a = {answer} props = {props}/>}
    </div>
  )
}

export default Answer;