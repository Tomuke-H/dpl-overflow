import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { Card, Image, NavLink } from "react-bootstrap";
import Activity from "../../pages/Activity";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AboutBox, AboutMe, AnswerTitle, ProfilePill, QuestionTitle, StatsAndAbout, StatsBox, ViewTitle, VotesStat, VoteTitle } from "./ProfileStyles";


export default function OtherUserProfile(props) {
  const [user, setUser] = useState({})
  const [showActivity, setShowActivity] = useState(false)
  const { user: currentUser } = useContext(AuthContext);

  useEffect(()=>{
    getUser()
  },[window.location.href])
  
  const Url = props.location.pathname.split("/") 
  const id = Url[2]

  const getUser = async () => {
    try {
    let res = await axios.get (`/api/users_profile/${id}`)
    setUser(res.data.user[0])
    } catch (err) {
      console.log("get user error", err)
    }
  }

  const showProfile = () => {
    setShowActivity(false)
    return console.log('profile')
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
          <Image style={styles.profilePic} src={user.image} />
          <p style={styles.name}>{user.name}</p>
      </div>
        <div style={styles.optionsContainer}>
          <ProfilePill onClick={()=>setShowActivity(false)}>Profile</ProfilePill>
          <ProfilePill onClick={()=>{setShowActivity(!showActivity)}}>Activity</ProfilePill>
          {user.id === currentUser.id && <NavLink as={Link} to={`/user/edit`}><ProfilePill>Settings</ProfilePill></NavLink>}
          </div>
          <ShowActivityStyle>
          {showActivity && <Activity user = {user}/>}
        </ShowActivityStyle>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={styles.stats}>STATS</p>
        <p style={styles.about}>about</p>
        </div>
        <StatsAndAbout>
          <StatsBox />
            <VotesStat>{user.answer_likes + user.question_likes + user.comment_likes}</VotesStat>
            <p>{user.answer_count}</p>
            <p>{user.question_views? user.question_views : 0}</p>
            <p>{user.question_count}</p>
          <VoteTitle>Votes</VoteTitle>
          <AnswerTitle>Answers</AnswerTitle>
          <ViewTitle>Views</ViewTitle>
          <QuestionTitle>Questions</QuestionTitle>
        <AboutBox />
          <AboutMe>{user.about_me}</AboutMe>
        </StatsAndAbout>
    </div>
  )



}

const styles = {
  statsCard: {
    width: '600px',
    flexDirection: 'column',
    marginLeft: '78px',
    flex: 1,
  },
  profilePic: {
    borderRadius: '4px',
    width: '59px',
    height: '59px',
    margin:'47px',
    marginBottom: '51px',
    marginRight: '20px',
    marginLeft: '78px'
  },
  name: {
    width: '180px',
    height: '41px',
    fontStyle: 'normal',
    fontWeight: '600px',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: '20px',
    marginLeft: '18px',
    marginTop: '58px',
    color: '#000000',
    left: '157px',
    top: '126px',
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: '69px',
    marginBottom: '51px'
  },
  stats: {
    position: 'absolute',
    width: '85px',
    height: '36px',
    left: '79px',
    top: '295px',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '36px',
    display: 'flex',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',

  },
  about: {
    position: 'absolute',
    width: '36px',
    height: '22px',
    left: '711px',
    top: '302px',
    // font-style: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    alignItems: 'center',
    
    color: '#000000'
  },
}



export const ShowActivityStyle = styled.div`
margin-left: 78px;
`

