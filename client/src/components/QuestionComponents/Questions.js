import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container, Button } from "react-bootstrap";
import QuestionPagination from "./QuestionPagination";
import useAxiosQuestion from "../../hooks/useAxiosQuestion";

const Questions = ({history}) => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState(null)
  const [sortBy, setSortBy] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getDataByTag = async (t, p) => {
    setTag(t)
    setSortBy('tag')
    try{
      let res = await axios.get(`/api/find_questions_by_tag/${t}?page=${p}`)
      setQuestions(res.data.questions)
      setTotalPages(res.data.total_pages)
    } catch (err){
      console.log(err)
    }
  }

  const getAllData = async (p) => {
    setSortBy('all')
    setTag(null)
    try{
      let res = await axios.get(`/api/questions?page=${p}`)
      setQuestions(res.data.questions)
      setTotalPages(res.data.total_pages)
    }catch(err){
      console.log(err)
    }
  }

  const getQuestions = (sC, p, t) => {
    setPage(p)
    switch (sC){
      case "all" :
        getAllData(p)
        break;
      case "tag" :
        getDataByTag(t, p)
        break;
      default:
        alert('Hook failed')
        break;
    }
  }

  useEffect(()=>{
    getTags()
    getQuestions('all', page)
  },[])


  const getTags = async () => {
    try{
      let res = await axios.get('/api/tags')
      setTags(res.data)
    } catch(err) {
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
          <Button key={t.id} onClick={(e)=>getQuestions('tag', 1, t.name)}>{t.name}</Button>
      )
    })
  }


  return (
    <Container>
      {renderTags()}
      <Button onClick={(e)=> getQuestions('all', 1)}>Show All</Button>
      <QuestionPagination tag={tag} sortBy={sortBy} getQuestions={getQuestions} page={page} totalPages={totalPages} />
      {renderQuestions()}
    </Container>
  )
}

export default Questions;