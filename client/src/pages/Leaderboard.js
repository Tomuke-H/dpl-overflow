import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dropdown, ListGroup } from 'react-bootstrap'
import BoxLoader from '../components/BoxLoader'
import MyPagination from '../components/QuestionComponents/MyPagination'
import InfiniteScroll from 'react-infinite-scroll-component'

const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('all')
  const [cohort, setCohort] = useState(null)

  useEffect(()=>{
    getUsers(sortBy, null, page)
  },[])

  const getAllUsers = async (p) => {
    setCohort(null)
    try{
      let res = await axios.get(`/api/leaderboard?page=${p}`)
      setUsers(users.concat(res.data.users))
      setTotalPages(res.data.total_pages)
      console.log(users)
      setPage(p)
    }catch (err) {
      console.log(err)
    }
  }

  // const getCohortUsers = async (p, cohort) => {
  //   setCohort(cohort)
  //   try{
  //     let res = await axios.get(`/api/cohort_leaderboard?cohort=${cohort}&page=${p}`)
  //     setUsers(res.data.users)
  //     setTotalPages(res.data.total_pages)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  const getUsers = (sortBy, cohort, p) => {
    console.log('called')
    console.log(sortBy)
    setSortBy(sortBy)
    switch(sortBy){
      case 'all':
        getAllUsers(p)
        break;
      // case 'cohort':
      //   getCohortUsers(p, cohort)
      //   break;
      default:
        console.log('Somefin bad happened')
    }
  }

  const renderUsers = () => {
    return users.map((u, index)=> {
      return (
        <ListGroup.Item className='d-flex justify-content-between' as='li' key={u.id}>
          <h2>{(index + 1)}</h2>
          <div>
            Name: {u.name}
          </div>
            Cohort: {u.cohort}
          <div>
            Points: {u.points}
          </div>
        </ListGroup.Item>
      )
    })
  }

  return (
    <div>
      <h1>Top Answerer's</h1>
      <h2>page:{page}</h2>
      <h2>total pages:{totalPages}</h2>

      <Dropdown>
        <Dropdown.Toggle>View By Cohort</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => getUsers('all', null, 1)}>View All</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 'Fall 2021')}>Fall 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 'Winter 2021')}>Winter 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 'Spring 2022')}>Spring 2022</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div style={{maxWidth: '1000px'}}>
        <InfiniteScroll
          dataLength={users.length}
          next={(e)=>getUsers(sortBy, cohort, page + 1)}
          hasMore={page<totalPages}
          loader={<BoxLoader/>}
        >
          {renderUsers()}
        </InfiniteScroll>
        {/* <ListGroup as='ol'>
          {renderUsers()}
        </ListGroup>
        {totalPages > 1 && <MyPagination tag={cohort} page={page} totalPages={totalPages} getData={getUsers} sortBy={sortBy}/>} */}
      </div>
    </div>
  )
}

export default Leaderboard;