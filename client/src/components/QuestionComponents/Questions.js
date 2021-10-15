import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container, Form } from "react-bootstrap";
import SortSelector from "./SortSelector";
import BoxLoader from "../BoxLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const Questions = ({history}) => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [tags, setTags] = useState([])
  const [tagSearch, setTagSearch] = useState([])
  const [sortBy, setSortBy] = useState('all')
  const [showTags, setShowTags] = useState(false)
  const [search, setSearch] = useState('')

  const setStates = (data, p) => {
    setQuestions(p === 1 ? data.questions : questions.concat(data.questions))
    setTotalPages(data.total_pages)
    setPage(p)
  }

  const getDataByTag = async (p, t) => {
    console.log('axios', tagSearch)
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
    setTagSearch([])
    try{
      let res = await axios.get(`/api/unanswered_questions?page=${p}`)
      setStates(res.data, p)
    }catch(err){
      console.log(err)
    }
  }

  const getAllData = async (p) => {
    setSortBy('all')
    setTagSearch([])
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
    switch (sC){
      case "all" :
        setShowTags(false)
        getAllData(p)
        break;
      case "tag" :
        getDataByTag(p, t)
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

  return (
    <Container style={{marginTop: '30px'}}>
      <h2>{JSON.stringify(tagSearch)}</h2>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <Form.Control value={search} onChange={(e) => getQuestions('search', 1, e.target.value)}/>
        </div>
        <div>
          <SortSelector 
            tagSearch={tagSearch} 
            setTagSearch={setTagSearch}
            showTags={showTags} 
            tags={tags} 
            setShowTags={setShowTags} 
            getQuestions={getQuestions} 
          />
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={questions.length}
          next={(e)=>getQuestions(sortBy, (page + 1), tagSearch)}
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