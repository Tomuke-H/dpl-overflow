import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { Image, NavLink } from "react-bootstrap";
import Activity from "../../pages/Activity";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AboutMe, ProfilePill, StatNum, StatsAndAbout, Box, StatTitle, ToggleOptions } from "./ProfileStyles";


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

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
          <Image style={styles.profilePic} src={user.image} />
            <p style={styles.name}>{user.name}</p>
      </div>
        <div style={styles.optionsContainer}>
          {showActivity ? <ToggleOptions onClick={()=>setShowActivity(false)}>Profile</ToggleOptions> : <ProfilePill onClick={()=>setShowActivity(false)}>Profile</ProfilePill> }
          {showActivity ? <ProfilePill onClick={()=>{setShowActivity(!showActivity)}}>Activity</ProfilePill> : <ToggleOptions onClick={()=>{setShowActivity(!showActivity)}}>Activity</ToggleOptions> }
          {user.id === currentUser.id && <NavLink style={styles.buttonfix} as={Link} to={`/user/edit`}><ToggleOptions>Settings</ToggleOptions></NavLink>}
          </div>
          <ShowActivityStyle>
          {showActivity && <Activity user = {user}/>}
        </ShowActivityStyle>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <Title style={{marginLeft: '60px'}}>STATS</Title>
        <Title style={{marginLeft: '635px'}}>about</Title>
        </div>
        <StatsAndAbout>
          <Box>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <StatNum>{user.answer_likes + user.question_likes + user.comment_likes}</StatNum>
            <StatNum>{user.answer_count}</StatNum>
            <StatNum>{user.question_views? user.question_views : 0}</StatNum>
            <StatNum>{user.question_count}</StatNum>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <StatTitle>Votes</StatTitle>
          <StatTitle>Answers</StatTitle>
          <StatTitle>Views</StatTitle>
          <StatTitle>Questions</StatTitle>
          </div>
          </Box>
        <Box>
          <AboutMe>{user.about_me}</AboutMe>
        </Box>
        </StatsAndAbout>
    </div>
  )



}

const styles = {
  buttonfix: {
     transform: "translateY(-8px) translateX(-16px)",
  },
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
    marginLeft: '60px'
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
    // left: '157px',
    // top: '126px',
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: '32px',
  },
 
}

export const Title = styled.div`
  width: 85px;
  height: 36px;
  font-weight: 600px;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  text-align: center;
  text-transform: uppercase;
  color: #000000;
  margin-bottom: 18px;
`



export const ShowActivityStyle = styled.div`
margin-left: 78px;
`

