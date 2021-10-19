import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Activity = ({user}) => {
  const [userAnswers, setUserAnswers] = useState({})
  const [userQuestions, setUserQuestions] = useState({})

const getUserAnswers = async () => {
  try {
    let res = await axios.get(`/api/user_answers/${user.id}`)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

useEffect(()=>{
  getUserAnswers();
},[])




  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
};

export default Activity;