import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container, Button } from "react-bootstrap";
import QuestionPagination from "./QuestionPagination";

const Questions = ({history}) => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [tags, setTags] = useState([])

  useEffect(()=>{
    getAllQuestions()
    getTags()
  },[])

  const getQuestionsByTag = async (tag) => {
    console.log(tag)
    try{
      let res = await axios.get(`/api/find_questions_by_tag/${tag}`)
      setQuestions(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getTags = async () => {
    try{
      let res = await axios.get('/api/tags')
      setTags(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const getAllQuestions = async () => {
    try{
      let res = await axios.get('/api/questions')
      console.log(res.data)
      setQuestions(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const renderQuestions = () => {
    return questions.map(q => {
      return (
        <div key={q.id} style={{marginBottom: "30px"}}>
          <QuestionCard question={q} history={history}/>
        </div>
      )
    })
  }

  const renderTags = () => {
    return tags.map(t => {
      return (
          <Button key={t.id} onClick={(e)=>getQuestionsByTag(t.name)}>{t.name}</Button>
      )
    })
  }

  return (
    <Container>
      {renderTags()}
      <Button onClick={getAllQuestions}>Show All</Button>
      <QuestionPagination setPage={setPage} page={page} totalPages={totalPages} />
      {renderQuestions()}
    </Container>
  )
}

export default Questions;