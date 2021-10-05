import React from "react";
import EditQuestionForm from "../components/EditQuestionForm";
import NewQuestionForm from "../components/NewQuestionForm";
import Question from "../components/Question";

const QuestionTestPage = (props) => {
  return (
    <div>
      <Question props={props}/>
      <NewQuestionForm />
      <EditQuestionForm props={props}/>
    </div>
  )
}

export default QuestionTestPage;