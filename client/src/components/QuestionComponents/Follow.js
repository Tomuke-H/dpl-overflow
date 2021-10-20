import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../providers/AuthProvider";

const Follow = ({user,follow,question}) =>{
  const{setUser} = useContext(AuthContext)
  const [followed, setFollowed] = useState(follow);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(()=>{
    checkFollow()
  },[followed])

  const checkFollow = () => {
    if(followed.length !==0 ){
      if(followed.includes(question) === true){
        setIsFollowed(true)
      }
    }
  }
  const handleFollow = async ()=>{
    if(isFollowed){
      try {
        let unfollow = followed.filter((i) => i !== question)
        let res = await axios.put(`/api/follow`, {follow: unfollow})
        setUser(res.data)
        setFollowed(unfollow)
        setIsFollowed(false)        
      } catch (err) {
        console.log(err)
      }
    }else{
      try {
        followed.push(question)
        let res = await axios.put(`/api/follow`, {follow: followed})
        setFollowed(followed)
        setIsFollowed(true)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return(
    <p onClick={()=>{handleFollow()}}>{isFollowed?"Unfollow":"Follow"}</p>
  )
}

export default Follow