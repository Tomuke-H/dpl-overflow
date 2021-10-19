import axios from "axios";
import React, {  useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import EditUser from "./EditUser";


export default function OtherUserProfile(props) {
  const [user, setUser] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [views, setViews] = useState(0)

  useEffect(()=>{
    getUser()
  },[])

  const Url = props.location.pathname.split("/") 
  const id = Url[2]


  const getUser = async () => {
    try {
    let res = await axios.get (`/api/users_profile/${id}`)
    setUser(res.data.user)
    console.log("res.data:", res.data)
    setViews(res.data.views[0].question_views)
    // console.log("user:", user)
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
          <Button onClick={()=>{setShowForm(false)}}style={styles.profile}>Profile</Button>
          <Button onClick={()=>{setShowForm(false)}}style={styles.activity}>Activity</Button>
          <Button onClick={()=>{setShowForm(!showForm)}}style={styles.settings}>Settings</Button>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={styles.stats}>STATS</p>
        <p style={styles.about}>ABOUT</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Card style={{width: '600px', height: '79px', flexDirection: 'row'}}>
            {/* <Card.Body>Votes: {user.votes}</Card.Body> */}
            {/* <Card.Body>Answers: {user.answer_count}</Card.Body> */}
            <Card.Body>Views: {views}</Card.Body>
            {/* <Card.Body>Questions: {user.question_count}</Card.Body> */}
          </Card>
        <Card style={{width: '600px', height: '79px'}}>
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
    fontWeight: '600',
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
  },
  stats: {
    flex: 1,
    width: '87px',
    height: '41px',
    left: '78px',
    top: '293px',

    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '#000000',

  },
  profile: {
    // position: 'absolute',
    width: '40px',
    height: '15px',
    left: '81px',
    top: '227px',

    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '15px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.5px',

    color: '#000000',
  },
  activity: {
    // position: 'absolute',
    width: '40px',
    height: '15px',
    // left: '151px',
    // top: '227px',

    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '15px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.5px',

    color: '#000000',
  },
  settings: {
    // position: 'absolute',
    width: '40px',
    height: '15px',
    // left: '229px',
    // top: '227px',

    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '15px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.5px',

    color: '#000000',
  },
  about: {
    // position: 'absolute',
    width: '103px',
    flex: 1,
    height: '41px',
    // left: '711px',
    // top: '293px',

    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',

    color: '#000000',
  }
}