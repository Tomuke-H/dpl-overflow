import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import QuestionCard from "./QuestionCard";
import { Container, Form } from "react-bootstrap";
import SortSelector from "./SortSelector";
import BoxLoader from "../BoxLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../stylesheets/TagPage.css"


const Questions = ({location, history}) => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [tags, setTags] = useState([])
  const [tagSearch, setTagSearch] = useState(location.state ? [location.state.id]:[])
  const [sortBy, setSortBy] = useState('all')
  const [showTags, setShowTags] = useState(location.state ? true : false)
  const [search, setSearch] = useState('')
  const [selectedValues, setSelectedValues] = useState(location.state ? [location.state] : [])

  const setStates = (data, p) => {
    setQuestions(p === 1 ? data.questions : questions.concat(data.questions))
    setTotalPages(data.total_pages)
    setPage(p)
  }

  const getDataByTag = async (p, t) => {
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

  const getFollow = async (p) => {
    setSortBy('follow')
    setTagSearch([])
    try{
      let res = await axios.get(`/api/follow?page=${p}`)
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
    setSortBy('search')
    try{
      let res = await axios.get(`/api/question_search?page=${p}&body=${t}`)
      setStates(res.data, p)
    }catch(err){
      console.log(err)
    }
  }

  const getQuestions = (sC, p, t, s) => {
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
        setSearch(s)
        if(!s){
          getAllData(1)
        }else {
          getDataSearch(p, s)
        }
        break;
      case "follow":
        setShowTags(false)
        getFollow(p)
        break;
      default:
        alert('Unsupported search method')
        break;
    }
  }

  useEffect(()=>{
    getTags()
    if(location.state){
      getQuestions('tag', 1, location.state.id)
    } else {
      getQuestions('all', page)
    }
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
        <div key={q.id} style={{marginBottom: "6px"}}>
          <QuestionCard question={q} history={history}/>
        </div>
      )
    })
  }

  return (
    <Container style={{marginTop: '30px'}}>
      {/* <h2>{JSON.stringify(tagSearch)}</h2> */}
      <div style={styles.titleWrapper}>
        <div>
          <h1 style={styles.title}>TOP QUESTIONS</h1>
          <input style={styles.input} placeholder='Search' value={search} id = "add" onChange={(e) => getQuestions('search', 1, null, e.target.value)}/>
        </div>
        <div style={styles.selectWrapper}>
          <SortSelector 
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            sortBy={sortBy}
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
          next={(e)=>getQuestions(sortBy, (page + 1), tagSearch, search)}
          hasMore={page<totalPages}
          loader={<BoxLoader/>}
        >
          {renderQuestions()}
        </InfiniteScroll>
      </div>
    </Container>
  )
}

const styles = {
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '60px 0px 6px 0px',
  },
  title: {
    fontWeight: '600',
    marginBottom: '40px'
  },
  selectWrapper: {
    paddingTop: '46px'
  },
  input: {
    borderRadius:"20px",
    padding:"7px 0px 8px 35px",
  },
}

export default Questions;