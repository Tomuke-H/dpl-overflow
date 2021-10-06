import React, { useContext } from "react";
import { AuthContext } from '../providers/AuthProvider'


export default function User() {
  const { user: currentUser } = useContext(AuthContext)


  const renderUser = () => {
    return (
      <div>
        <h1>{currentUser.name}</h1>
        <h2>{currentUser.cohort}</h2>
        <p>{currentUser.aboutMe}</p>
      </div>
    )
  }


  return (
    <div>
      <h1>Profile</h1>
        {renderUser()}
    </div>
  )



}