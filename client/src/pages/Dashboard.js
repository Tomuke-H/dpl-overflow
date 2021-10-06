import axios from "axios";
import React, { useEffect, useState } from "react";
import NewQuestionForm from "../components/QuestionComponents/NewQuestionForm";

const Dashboard = (props) => {
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    getQuestions()
  },[])

  const getQuestions = async () => {
    try{
      let res = await axios.get('/api/questions')
      setQuestions(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const renderQuestions = () => {
    return questions.map(q => {
      return (
        <div>
          <h2>{q.title}</h2>
          <h2>{q.body}</h2>
        </div>
      )
    })
  }
  return (
    <div>
      <NewQuestionForm />
      {renderQuestions()}
    </div>
  )
}

export default Dashboard;