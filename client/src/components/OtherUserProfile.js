import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import Activity from "../pages/Activity";
import { AuthContext } from "../providers/AuthProvider";
import { TagPill } from "./TagComponents/TagPill";


export default function OtherUserProfile(props) {
  const [user, setUser] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [showActivity, setShowActivity] = useState(false)
  const { user: currentUser } = useContext(AuthContext);
  const [activityUser, setActivityUser] = useState({})

  useEffect(()=>{
    getUser()
  },[])

  const Url = props.location.pathname.split("/") 
  const id = Url[2]


  const getUser = async () => {
    try {
    let res = await axios.get (`/api/users_profile/${id}`)
    res.data.user[0].id === currentUser.id ? setUser(currentUser) : setUser(res.data.user[0])
    } catch (err) {
      console.log("get user error", err)
    }
  }




  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
          <Image style={styles.profilePic} src={user.image} />
          <p style={styles.name}>{user.name}</p>
      </div>
        <div style={styles.optionsContainer}>
          <TagPill onClick={()=>setShowActivity(false)}>Profile</TagPill>
          <TagPill onClick={()=>{setShowActivity(!showActivity)}}>Activity</TagPill>
          {user.id === currentUser.id && <Button onClick={()=>{setShowForm(!showForm)}}>Settings</Button>}
          {showActivity && <Activity user = {user}/>}
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={styles.stats}>STATS</p>
        <p style={styles.about}>ABOUT</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Card style={{width: '600px', flexDirection: 'column', marginLeft: '78px', flex: 1}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}}>
            <Card.Body>{user.answer_likes + user.question_likes + user.comment_likes}</Card.Body>
            <Card.Body>{user.answer_count}</Card.Body>
            <Card.Body>{user.question_views}</Card.Body>
            <Card.Body>{user.question_count}</Card.Body>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}}>
          <Card.Body>Votes</Card.Body>
          <Card.Body>Answers</Card.Body>
          <Card.Body>Views</Card.Body>
          <Card.Body>Questions</Card.Body>
          </div>
          </Card>
        <Card style={{width: '600px', height: '79px', flex: 1}}>
          <Card.Body>{user.about_me}</Card.Body>
        </Card>
        </div>
    </div>
  )



}

const styles = {
  profilePic: {
    borderRadius: '4px',
    width: '59px',
    height: '59px',
    margin:'78px',
    marginBottom: '51px',
    marginRight: '20px'
  },
  name: {
    width: '180px',
    height: '41px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600px',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: '20px',
    marginTop: '85px',
    color: '#000000',
    left: '157px',
    top: '126px',
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: '74px',
    marginBottom: '51px'
  },
  stats: {
    flex: 1,
    width: '87px',
    height: '41px',
    left: '78px',
    top: '293px',
    marginLeft: '78px',

    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600px',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '#000000',

  },
  about: {
    width: '103px',
    flex: 1,
    height: '41px',

    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600px',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',

    color: '#000000',
  }
}