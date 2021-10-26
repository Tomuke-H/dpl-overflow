import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserRow = ({id, index, history}) => {
  const [u, setU] = useState({})
  const [points, setPoints] = useState(0)

  useEffect(() => {
    getUserInfo()
  }, [id])

const getUserInfo = async(user) => {
  try {
  let res = await axios.get (`/api/users_profile/${id}`);
  setU(res.data.user[0])
  userPoints(res.data.user[0])
  } catch (err) {
    console.log("get user error", err)
  }
}

const userPoints = async(user) => {
  let points = user.answer_count + user.question_count + 2*(user.answer_likes + user.question_likes);
  try {
    let res = await axios.put(`/api/user_points/${user.id}`, {
      points: points
    })
    setPoints(res.data.points)
  } catch(err) {
    console.log("point problem", err)
  }
}

return (
  <tr style={styles.tbody} key={u.id} onClick={(e) => history.push(`/users/${u.id}/profile`)}>
    <td><img style={styles.img} src={u.image} /></td>
    <td>{(index + 1)}</td>
    <td>{u.name}</td>
    <td>{points}</td>
    <td>{u.cohort}</td>
    <td>{u.answer_likes + u.question_likes}</td>
    <td>{u.answer_count}</td>
    <td>{u.question_count}</td>
  </tr>
)
}

const styles = {
  img: {
    height: '50px',
    width: '50px'
  },
  tbody: {
    borderStyle:"hidden"
  },
}

export default UserRow;