import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dropdown, ListGroup } from 'react-bootstrap'
import BoxLoader from '../components/BoxLoader'
import MyPagination from '../components/QuestionComponents/MyPagination'

const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('all')
  const [cohort, setCohort] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getUsers(sortBy, page)
  },[])

  const getAllUsers = async () => {
    setCohort(null)
    try{
      let res = await axios.get('/api/leaderboard?')
      setUsers(res.data.users)
      setTotalPages(res.data.total_pages)
    }catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const getCohortUsers = async (page, cohort) => {
    setCohort(cohort)
    try{
      let res = await axios.get(`/api/cohort_leaderboard?cohort=${cohort}`)
      setUsers(res.data.users)
      setTotalPages(res.data.total_pages)
    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }

  const getUsers = (sortBy, page, cohort) => {
    setPage(1)
    setSortBy(sortBy)
    setLoading(true)
    switch(sortBy){
      case 'all':
        getAllUsers(page)
        break;
      case 'cohort':
        getCohortUsers(page, cohort)
        break;
      default:
        console.log('Somefin bad happened')
        setLoading(false)
    }
  }

  const renderUsers = () => {
    return users.map((u, index)=> {
      return (
        <ListGroup.Item className='d-flex justify-content-between' as='li' key={u.id}>
          <h2>{index + 1}</h2>
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

      <Dropdown>
        <Dropdown.Toggle>View By Cohort</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => getUsers('all', 1)}>View All</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 1, 'Fall 2021')}>Fall 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 1, 'Winter 2021')}>Winter 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 1, 'Spring 2022')}>Spring 2022</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {loading && <BoxLoader />}

      <div style={{maxWidth: '1000px'}}>
        <ListGroup as='ol'>
          {renderUsers()}
        </ListGroup>
        <MyPagination tag={cohort} page={page} totalPages={totalPages} getData={getUsers} sortBy={sortBy}/>
      </div>
    </div>
  )
}

export default Leaderboard;