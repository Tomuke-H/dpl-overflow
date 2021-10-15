import React from "react";
import { useHistory } from "react-router";
import Questions from "../components/QuestionComponents/Questions";

const Dashboard = (props) => {
  const history = useHistory()
  return (
    <div>
      <Questions history={history}/>
    </div>
  )
}

export default Dashboard; 