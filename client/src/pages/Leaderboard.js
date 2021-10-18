import axios from 'axios'
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap'
import BoxLoader from '../components/BoxLoader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('all')
  const [cohort, setCohort] = useState(null)
  const history = useHistory()

  useEffect(()=>{
    getUsers(sortBy, null, page)
  },[])

  const getAllUsers = async (p) => {
    setCohort(null)
    try{
      let res = await axios.get(`/api/leaderboard?page=${p}`)
      setTotalPages(res.data.total_pages)
      setUsers(p === 1 ? res.data.users : users.concat(res.data.users))
      setPage(p)
    }catch (err) {
      console.log(err)
    }
  }

  const getCohortUsers = async (p, cohort) => {
    try{
      let res = await axios.get(`/api/cohort_leaderboard?cohort=${cohort}&page=${p}`)
      setTotalPages(res.data.total_pages)
      setUsers(p === 1 ? res.data.users : users.concat(res.data.users))
      setPage(p)
    }catch(err){
      console.log(err)
    }
  }

  const getUsers = (sortBy, cohort, p, reset) => {
    setSortBy(sortBy)
    setCohort(cohort)
    switch(sortBy){
      case 'all':
        getAllUsers(p)
        break;
      case 'cohort':
        getCohortUsers(p, cohort)
        break;
      default:
        console.log('Somefin bad happened')
    }
  }

  const renderUsers = () => {
    return users.map((u, index)=> {
      return (
        <tr key={u.id} onClick={(e) => history.push(`/users/${u.id}/profile`)}>
          <td><img style={styles.img} src={u.image} /></td>
          <td>{(index + 1)}</td>
          <td>{u.name}</td>
          <td>{u.points}</td>
          <td>{u.cohort}</td>
          <td>Num 1</td>
          <td>Num 2</td>
          <td>Num 3</td>
        </tr>
      )
    })
  }

  return (
    <div style={styles.wrapper}>
      <Dropdown>
        <Dropdown.Toggle>View By Cohort</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => getUsers('all', null, 1)}>View All</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 'Fall 2021', 1)}>Fall 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 'Winter 2021', 1)}>Winter 2021</Dropdown.Item>
          <Dropdown.Item onClick={(e) => getUsers('cohort', 'Spring 2022', 1)}>Spring 2022</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <InfiniteScroll
        dataLength={users.length}
        next={(e)=>getUsers(sortBy, cohort, (page + 1))}
        hasMore={page<totalPages}
        loader={<BoxLoader/>}
        style={styles.table}
      >
        <Table hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
              <th>Cohort</th>
              <th>Stat 1</th>
              <th>Stat 2</th>
              <th>Stat 3</th>
            </tr>
          </thead>
          <tbody>
            {renderUsers()}
          </tbody>
        </Table>
      </InfiniteScroll>
    </div>
  )
}

const styles ={
  img: {
    height: '50px',
    width: '50px'
  },
  tableWrapper: {
    display: 'flex',
    width: '2000px',
    justifyContent: 'center'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default Leaderboard;