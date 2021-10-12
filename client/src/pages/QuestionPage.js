import React, { useEffect } from "react";
import Question from "../components/QuestionComponents/Question";
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router";
import Answers from "../components/AnswerComponents/Answers";

const QuestionPage = (props) => {
  const history = useHistory()
  const [edited, setEdited] = useState(false)

  useEffect(()=>{
    setEdited(false)
  }, [edited])

  return (
    <div>
      <Question props={props} edited = {edited} setEdited={setEdited} history={history}/>
      <Answers props = {props} /> 
    </div>
  )
}

export default QuestionPage;