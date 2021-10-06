import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import Questions from "../components/QuestionComponents/Questions";
import { Button } from 'react-bootstrap'

const Dashboard = (props) => {
  const history = useHistory()
  return (
    <div>
      <Button type="submit" onClick={()=>history.push('new_question')}>Ask a Question</Button>
      <Questions history={history}/>
    </div>
  )
}

export default Dashboard;