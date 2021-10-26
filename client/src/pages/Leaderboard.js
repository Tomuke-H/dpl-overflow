import axios from 'axios'
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
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
        <ul onClick={(e) => getUsers('cohort', c, 1)}>{c}</ul>
      )
    })
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.leaderboard}>Leaderboard</h1>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <button className='button' onClick={(e) => getUsers('all', null, 1)}>All-Time</button>
          <div className="dropdown">
          <div className={cohort? 'dropfocus':'dropbtn'}>{cohort ? `${cohort}`:'Cohort'}</div>
          <div className="dropdown-content">
            {renderDropdownItems()}
          </div>
        </div>
          {/* <Dropdown >
            <Dropdown.Toggle style={styles.button}>Cohort</Dropdown.Toggle>
            <Dropdown.Menu>
            {renderDropdownItems()}
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={(e)=>getUsers(sortBy, cohort, (page + 1))}
        hasMore={page<totalPages}
        loader={<BoxLoader/>}
        style={styles.table}
      >
        <Table hover responsive>
          <thead style={styles.theader}>
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
  img: {
    height: '50px',
    width: '50px'
  },
  table: {
    width: '86.1vw',
    border: '1.5px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '6px',
    padding: '25px 50px 25px 50px',
    marginTop: '30px',
    marginBottom: '30px',
    backgroundColor:'#FFFFFF'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '86.1vw',
    alignItems: 'center',
    margin: '90px 0px 0px 0px',
  },
  leaderboard: {
    fontStyle: 'normal',
    fontWeight: '600px',
    textTransform: 'uppercase',
    flexDirection: 'flex-end',
    color: '#000000',
  },
  theader: {
    textDecoration:"underline"
  },
  tbody: {
    borderStyle:"hidden"
  },
}

export default Leaderboard;