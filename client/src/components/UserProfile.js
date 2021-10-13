import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import useGetUser from "../hooks/useGetUser";
import { AuthContext } from '../providers/AuthProvider'
import EditUser from "./EditUser";


export default function UserProfile() {
  const { user } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)


  const renderUser = () => {
    return (
      <>
      <div>
        <Image style={styles.profilePic} src={user.image} />
        <p style={styles.name}>{user.name}</p>
      </div>
      <div style={styles.optionsContainer}>
        <Button style={styles.profile}>Profile</Button>
        <Button style={styles.activity}>Activity</Button>
        <Button onClick={()=>{setShowForm(!showForm)}}style={styles.settings}>Settings</Button>
        {showForm && <EditUser />}
      </div>
      <div>
        <p style={styles.stats}>STATS</p>
        <p style={styles.about}>ABOUT</p>
      </div>
      </>
    )
  }


  return (
    <div>
        {renderUser()}
    </div>
  )



}

const styles = {
  profilePic: {
    position: 'absolute',
    width: '59px',
    height: '59px',
    left: '78px',
    top: '117px'
  },
  name: {
    position: 'absolute',
    width: '180px',
    height: '41px',
    left: '157px',
    top: '126px',

    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '#000000'
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  stats: {
    position: 'absolute',
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
    position: 'absolute',
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
    position: 'absolute',
    width: '40px',
    height: '15px',
    left: '151px',
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
  settings: {
    position: 'absolute',
    width: '40px',
    height: '15px',
    left: '229px',
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
  about: {
    position: 'absolute',
    width: '103px',
    height: '41px',
    left: '711px',
    top: '293px',

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