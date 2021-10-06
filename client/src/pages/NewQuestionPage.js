import React from 'react'
import { useHistory } from 'react-router'
import NewQuestionForm from '../components/QuestionComponents/NewQuestionForm'

const NewQuestionPage = (props) => {
  const history = useHistory()

  const handleRedirect = (id) => {
    history.push(`/question/${id}`)
  }

  return(
    <div>
      <NewQuestionForm handleRedirect={handleRedirect}/>
    </div>
  )
}

export default NewQuestionPage;