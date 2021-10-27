import React from 'react'
import { useHistory } from 'react-router'
import NewQuestionForm from '../components/QuestionComponents/NewQuestionForm'

const NewQuestionPage = (props) => {
  const history = useHistory()

  const handleRedirect = (id) => {
    history.push(`/question/${id}`)
  }

  /// markdown backtick instructions? 
  
  return(
    <div style={{minWidth: '734px', minHeight: '480px'}}>
      <NewQuestionForm handleRedirect={handleRedirect}/>
    </div>
  )
}

export default NewQuestionPage;