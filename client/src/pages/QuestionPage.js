import React from "react";
import Question from "../components/QuestionComponents/Question";
import EditQuestionForm from "../components/QuestionComponents/EditQuestionForm"
import { useState } from "react";
import { Button } from 'react-bootstrap'

const QuestionPage = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false)

  return (
    <div>
      <Question props={props}/>
      <Button onClick={()=>setToggleEdit(!toggleEdit)}>Edit Question</Button>
      {toggleEdit && <EditQuestionForm props={props}/>}
    </div>
  )
}

export default QuestionPage;