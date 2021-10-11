import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import MyPagination from '../components/QuestionComponents/MyPagination'

const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = async () => {
    try{
      let res = await axios.get('/api/leaderboard')
      setUsers(res.data.users)
      setTotalPages(res.data.total_pages)
    }catch (err) {
      console.log(err)
    }
  }

  const renderUsers = () => {
    return users.map(u=> {
      return (
        <ListGroup.Item className='d-flex justify-content-between' as='li' key={u.id}>
          <div>
            {u.name}
          </div>
          <div>
            {u.points}
          </div>
        </ListGroup.Item>
      )
    })
  }

  return (
    <div>
      <h1>Top Answerer's</h1>
      <div style={{maxWidth: '1000px'}}>
        <ListGroup as='ol'>
          {renderUsers()}
        </ListGroup>
        <MyPagination page={page} totalPages={totalPages}/>
      </div>
    </div>
  )
}

export default Leaderboard;