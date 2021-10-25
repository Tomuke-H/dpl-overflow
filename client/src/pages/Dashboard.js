import React from "react";
import { useHistory } from "react-router";
import Questions from "../components/QuestionComponents/Questions";

const Dashboard = (props) => {
  const history = useHistory()
  return (
    <div style={{margin: '0px 97px 0px 97px'}}>
      <Questions location={props.location} history={history}/>
    </div>
  )
}

export default Dashboard; 