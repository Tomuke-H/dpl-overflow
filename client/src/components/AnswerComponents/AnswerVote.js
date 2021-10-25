import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"

const AnswerVote = ({answer}) => {
  const{user} = useContext(AuthContext)
  const[voteUsers, setVoteUsers] = useState([])
  const[upVoted, setUpVoted] = useState(false)
  const[downVoted, setDownVoted] = useState(false)

  useEffect(() => {
    getUserVotes();
  }, [])

  const getUserVotes = async() => {
    try {
      let res = await axios.get(`/api/answers/${answer.id}/users`)
      let datarray = []
      for (let i = 0; i < res.data.length; i++) {
        datarray.push(res.data[i].user_id)
      }
      console.log(datarray)
      setVoteUsers(datarray)
         if (datarray.includes(user.id)){
        checkUpDown();
      }
    } catch(err) {
      console.log("getUsers error", err)
    }
  }

  const upVote = async() => {
    try {
      let res = await axios.post(`/api/answers/${answer.id}/avotes`, {
        up: true,
        down: false,
        user_id: user.id,
        answer_id: answer.id,
        vote_code: `${user.id}-${answer.id}`
      })
      console.log("upVote", res)
    } catch(err) {
      alert(err)
    }
  }

  const downVote = async() => {
    try {
      let res = await axios.post(`/api/answers/${answer.id}/avotes`, {
        up: false,
        down: true,
        user_id: user.id,
        answer_id: answer.id,
        vote_code: `${user.id}-${answer.id}`
      })
      console.log("downVote", res)
      } catch(err) {
      alert(err)
    }
  }

  const checkIfVote = () => {
    if (voteUsers.includes(user.id)){
      checkUpDown();
    }
  }

  const checkUpDown = async() => {
    try {
      let res = await axios.get(`/api/avotes/${user.id}-${answer.id}`)
      console.log("votecheck", res.data[0])
      if (res.data[0].up === true) {
        setUpVoted(true)
        setDownVoted(false)
      }
      else if (res.data[0].down === true) {
        setUpVoted(false)
        setDownVoted(true)
      }
    } catch(err) {
      console.log("checkUpDown error", err)
    }
  }

  // const saveUpVote = async () => {
  //   try{
  //   await axios.put(`/api/questions/${answer.question_id}/answers/${answer.id}`, { 
  //     likes: answerLikes + 1
  //   })
  //   // console.log(res)
  // } catch (err) {
  //     console.log("upvote error", err)
  //   }
  // }


  // const saveDownVote = async () => {
  //   try{
  //   await axios.put(`/api/questions/${answer.question_id}/answers/${answer.id}`, { 
  //     likes: answerLikes - 1
  //   })
  //   // console.log(res)
  // } catch (err) {
  //     console.log("downvote error", err)
  //   }
  // }
  
  // const upVote = () =>
  // {dispatch("add");
  // saveUpVote(answerLikes)}

  // const downVote = () =>
  // {dispatch("subtract");
  // saveDownVote(answerLikes)}


  // const [answerLikes, dispatch] = useReducer((state, action) => {
  //   switch (action) {
  //     case "add":
  //       return state + 1;
  //     case "subtract":
  //       return state - 1;
  //   }
  // }, answer.likes);
  
    return (
      <div style={styles.likeBox}>
        <AiFillCaretUp
        size="40px"
        color={upVoted ? "#6E54A3":"#757575"}
         onClick={() => {upVote()}}/>
        {/* <p style={styles.likesNumber}>{answerLikes}</p> */}
        <AiFillCaretDown
        size="40px"         
        color={downVoted ? "#6E54A3":"#757575"}
        onClick={() => {downVote()}}/>
      </div>
    );
  };

  const styles = {
  likeBox: {
    position: "relative",
    left: "44px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  likesNumber: {
    maxWidth: "850px",
    margin: "10px",
    fontSize: "30px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "500px",
    display: "flex",
    alignItems: "center",
    letterSpacing: ".5px",
    color: "#000000",
  },
  }

export default AnswerVote;