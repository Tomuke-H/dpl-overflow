import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container, Button, Form } from "react-bootstrap";
import MyPagination from "./MyPagination";
import SortSelector from "./SortSelector";
import BoxLoader from "../BoxLoader";

const Questions = ({history}) => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState(null)
  const [sortBy, setSortBy] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTags, setShowTags] = useState(false)
  const [search, setSearch] = useState('')

  const setStates = (data) => {
    setQuestions(data.questions)
    setTotalPages(data.total_pages)
  }

  const getDataByTag = async (t, p) => {
    setTag(t)
    setSortBy('tag')
    try{
      let res = await axios.get(`/api/find_questions_by_tag/${t}?page=${p}`)
      setStates(res.data)
    } catch (err){
      console.log(err)
    }
  }

  const getDataByUnanswered = async (p) => {
    setSortBy('unanswered')
    setTag(null)
    try{
      let res = await axios.get(`/api/unanswered_questions?page=${p}`)
      setStates(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const getAllData = async (p) => {
    setSortBy('all')
    setTag(null)
    try{
      let res = await axios.get(`/api/questions?page=${p}`)
      setStates(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const getDataSearch = async (p, t) => {
    setSearch(t)
    setSortBy('search')
    try{
      let res = await axios.get(`/api/question_search?page=${p}&body=${t}`)
      setStates(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const getQuestions = (sC, p, t) => {
    setLoading(true)
    setPage(p)
    switch (sC){
      case "all" :
        setShowTags(false)
        getAllData(p)
        setLoading(false)
        break;
      case "tag" :
        getDataByTag(t, p)
        setLoading(false)
        break;
      case "unanswered" :
        setShowTags(false)
        getDataByUnanswered(p)
        setLoading(false)
        break;
      case "search":
        getDataSearch(p, t)
        setLoading(false)
        break;
      default:
        alert('Unsupported search method')
        setLoading(false)
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
      <SortSelector showTags={showTags} setShowTags={setShowTags} getQuestions={getQuestions} />
      {showTags && renderTags()}
      <Form.Control value={search} onChange={(e) => getQuestions('search', 1, e.target.value)}/>
      {totalPages > 1 && <MyPagination tag={tag} sortBy={sortBy} getData={getQuestions} page={page} totalPages={totalPages} />}
      {loading && <BoxLoader />}
      {renderQuestions()}
      {totalPages > 1 && <MyPagination tag={tag} sortBy={sortBy} getData={getQuestions} page={page} totalPages={totalPages} />}
    </Container>
  )
}

export default Questions;