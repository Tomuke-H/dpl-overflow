import React from "react";
import Question from "../components/QuestionComponents/Question";
import EditQuestionForm from "../components/QuestionComponents/EditQuestionForm"

const QuestionPage = (props) => {
  return (
    <div>
      <Question props={props}/>
      <EditQuestionForm props={props}/>
    </div>
  )
}

export default QuestionPage;