import axios from 'axios'
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap'
import BoxLoader from '../components/BoxLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {cohorts} from '../components/Cohorts';
import '../stylesheets/Leaderboard.css'
import UserRow from '../components/UserComponents/UserRow';

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
        <UserRow id={u.id} index={index} history={history}/>
      )
    })
  }

  const renderDropdownItems = () => {
    return cohorts.map(c => {
      return( 
        <Dropdown.Item onClick={(e) => getUsers('cohort', c, 1)}>{c}</Dropdown.Item>
      )
    })
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.leaderboard}>Leaderboard</h1>
        <Dropdown variant='leaderboard'>
          <Dropdown.Toggle style={styles.button}>Sort By Cohort</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => getUsers('all', null, 1)}>View All</Dropdown.Item>
            {/* <Dropdown.Item onClick={(e) => getUsers('cohort', 'Fall 2021', 1)}>Fall 2021</Dropdown.Item>
            <Dropdown.Item onClick={(e) => getUsers('cohort', 'Winter 2021', 1)}>Winter 2021</Dropdown.Item>
            <Dropdown.Item onClick={(e) => getUsers('cohort', 'Spring 2022', 1)}>Spring 2022</Dropdown.Item> */}
            {renderDropdownItems()}
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
              <th>Votes</th>
              <th>Answers</th>
              <th>Questions</th>
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
  tableWrapper: {
    display: 'flex',
    width: '1500px',
    justifyContent: 'center'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  table: {
    width: '86.1vw',
    border: '1.5px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '6px',
    padding: '25px 50px 25px 50px',
    marginTop: '30px',
    marginBottom: '30px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '86.1vw',
    alignItems: 'center',
    margin: '90px 0px 0px 0px',
  },

  button: {
    display: "inline-block",
    borderStyle: "solid",
    borderColor: "#6E54A3",
    borderRadius: "5px",
    fontWeight:"600px",
    fontSize: "14px",
    letterSpacing: ".7px",
    color:"#FFFFFF",
    backgroundColor:"#6E54A3",
    textAlign:"center",
    textTransform: "uppercase",
    width: "165px",
    height: "40px",
  },

  leaderboard: {
    fontStyle: 'normal',
    fontWeight: '600px',
    textTransform: 'uppercase',
    flexDirection: 'flex-end',
    color: '#000000',
  },
}

export default Leaderboard;