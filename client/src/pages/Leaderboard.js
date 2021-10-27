import axios from 'axios'
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import BoxLoader from '../components/BoxLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import '../stylesheets/Leaderboard.css'
import UserRow from '../components/UserComponents/UserRow';

const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('all')
  const [cohort, setCohort] = useState(null)
  const [cohorts, setCohorts] = useState([])
  const history = useHistory()

  useEffect(()=>{
    getCohorts()
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

  const getCohorts = async () => {
    try{
    let res = await axios.get(`/api/cohorts`)
    setCohorts(normCohorts(res.data))
  } catch(err) {
    console.log(err)
  }
}
  const normCohorts = (res)=>{
    let data = []
    res.forEach( co => {
      data.push(co.cohort)
    });
    return data
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

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin:"60px 95px 0px 95px", 
    padding:"10px",
    },

  table: {
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
    alignItems: 'center',
  },
  
  leaderboard: {
    fontStyle: 'normal',
    fontWeight: '600',
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