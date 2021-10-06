import axios from "axios";
import React from "react";
import NewQuestionForm from "../components/QuestionComponents/NewQuestionForm";
import Questions from "../components/QuestionComponents/Questions";

const Dashboard = (props) => {
  return (
    <div>
      <NewQuestionForm />
      <Questions />
    </div>
  )
}

export default Dashboard;