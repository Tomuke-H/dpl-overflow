import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import useGetUser from "../hooks/useGetUser";
import { AuthContext } from '../providers/AuthProvider'


export default function UserProfile() {
  const { user } = useContext(AuthContext)


  const renderUser = () => {
    return (
      <>
      <div>
        <Image style={styles.profilePic} src={user.image} />
        <p style={styles.name}>{user.name}</p>
      </div>
      <div>
        <p>Profile</p>
        <p>Activity</p>
        <p>Settings</p>
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
  }
}