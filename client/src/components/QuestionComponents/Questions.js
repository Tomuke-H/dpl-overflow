import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container, Button, Form } from "react-bootstrap";
import SortSelector from "./SortSelector";
import BoxLoader from "../BoxLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const Questions = ({history}) => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState(null)
  const [sortBy, setSortBy] = useState('all')
  const [error, setError] = useState(null)
  const [showTags, setShowTags] = useState(false)
  const [search, setSearch] = useState('')

  const setStates = (data, p) => {
    setQuestions(p === 1 ? data.questions : questions.concat(data.questions))
    setTotalPages(data.total_pages)
    setPage(p)
  }

  const getDataByTag = async (t, p) => {
    setTag(t)
    setSortBy('tag')
    try{
      let res = await axios.get(`/api/find_questions_by_tag/${t}?page=${p}`)
      setStates(res.data, p)
    } catch (err){
      console.log(err)
    }
  }

  const getDataByUnanswered = async (p) => {
    setSortBy('unanswered')
    setTag(null)
    try{
      let res = await axios.get(`/api/unanswered_questions?page=${p}`)
      setStates(res.data, p)
    }catch(err){
      console.log(err)
    }
  }

  const getAllData = async (p) => {
    setSortBy('all')
    setTag(null)
    try{
      let res = await axios.get(`/api/questions?page=${p}`)
      setStates(res.data, p)
    }catch(err){
      console.log(err)
    }
  }

  const getDataSearch = async (p, t) => {
    setSearch(t)
    setSortBy('search')
    try{
      let res = await axios.get(`/api/question_search?page=${p}&body=${t}`)
      setStates(res.data, p)
    }catch(err){
      console.log(err)
    }
  }

  const getQuestions = (sC, p, t) => {
    console.log('called')
    switch (sC){
      case "all" :
        setShowTags(false)
        getAllData(p)
        break;
      case "tag" :
        getDataByTag(t, p)
        break;
      case "unanswered" :
        setShowTags(false)
        getDataByUnanswered(p)
        break;
      case "search":
        getDataSearch(p, t)
        break;
      default:
        alert('Unsupported search method')
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
    <Container style={{marginTop: '30px'}}>
      <h2>Page: {page}</h2>
      <h2>TotalPages: {totalPages}</h2>
      <h2>Length: {questions.length}</h2>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '500px'}}>
          <Form.Control value={search} onChange={(e) => getQuestions('search', 1, e.target.value)}/>
        </div>
        <div>
          <SortSelector showTags={showTags} setShowTags={setShowTags} getQuestions={getQuestions} />
          {showTags && renderTags()}
        </div>
      </div>
      <div style={{maxWidth: '1000px'}}>
        <InfiniteScroll
          dataLength={questions.length}
          next={(e)=>getQuestions(sortBy, (page + 1), tag)}
          hasMore={page<totalPages}
          loader={<BoxLoader/>}
        >
          {renderQuestions()}
        </InfiniteScroll>
      </div>
    </Container>
  )
}

export default Questions;