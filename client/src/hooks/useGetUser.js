
import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = async () => {
    try{
      let res = await axios.get('/api/users')
      setUsers(res.data)
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
  }

  return {users}
}

export default useGetUser