import React, { useEffect } from "react";
import Question from "../components/QuestionComponents/Question";
import { useState } from "react";
import { useHistory } from "react-router";
import Answers from "../components/AnswerComponents/Answers";
import axios from "axios";

const QuestionPage = (props) => {
  const history = useHistory()
  const [question, setQuestion] = useState(null)
  const [edited, setEdited] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      getQuestion()
      setEdited(false)
      addView()
  }, [edited])

  const getQuestion = async () => {
    try {
      let res = await axios.get(`/api/questions/${props.match.params.id}`)
      setQuestion(res.data)
      setLoading(false)
    }catch (err) {
      console.log(err)
    }
  }
  
  const addView = async () => {
    try{
      await axios.put(`/api/add_view/${props.match.params.id}`)
      // console.log(res)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div style={styles.qcontainer}>
      <Question props={props} edited = {edited} setEdited={setEdited} history={history} question={question} loading={loading}/>
      <Answers props = {props} /> 
    </div>
  )
}

const styles = {
  qcontainer: {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: '86.1vw',
  border: '1.5px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '6px',
  padding: '25px 50px 25px 50px',
  marginTop: '30px',
  marginBottom: '30px',
  backgroundColor:'#FFFFFF'
}
}

export default QuestionPage;