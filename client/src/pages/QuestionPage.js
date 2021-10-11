import React, { useEffect } from "react";
import Question from "../components/QuestionComponents/Question";
import EditQuestionForm from "../components/QuestionComponents/EditQuestionForm"
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router";
import Answers from "../components/AnswerComponents/Answers";

const QuestionPage = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const history = useHistory()
  const [edited, setEdited] = useState(false)

  useEffect(()=>{
    setEdited(false)

  },[edited])

  return (
    <div>
      <Question props={props} edited = {edited} history={history}/>
      <Button onClick={()=>setToggleEdit(!toggleEdit)}>Edit Question</Button>
      {toggleEdit && <EditQuestionForm props={props} setEdited={setEdited}/>}
      <Answers props = {props} /> 
    </div>
  )
}

export default QuestionPage;