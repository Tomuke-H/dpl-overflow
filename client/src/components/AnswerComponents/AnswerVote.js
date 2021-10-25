import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"

const AnswerVote = ({answer}) => {
  const{user} = useContext(AuthContext)
  const[voteUsers, setVoteUsers] = useState([])
  const[vote, setVote] = useState()
  const[upVoted, setUpVoted] = useState(false)
  const[downVoted, setDownVoted] = useState(false)
  const[upVoteCount, setUpVoteCount] = useState(0)
  const[downVoteCount, setDownVoteCount] = useState(0)
  const[totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    getUserVotes();
    getUpVoteCount();
    getDownVoteCount();
    // getTotalVotes();
  }, [])

  const getUserVotes = async() => {
    try {
      let res = await axios.get(`/api/answers/${answer.id}/users`)
      let datarray = []
      for (let i = 0; i < res.data.length; i++) {
        datarray.push(res.data[i].user_id)
      }
      // console.log(datarray)
      setVoteUsers(datarray)
         if (datarray.includes(user.id)){
        checkUpDown();
      }
    } catch(err) {
      console.log("getUsers error", err)
    }
  }

  const checkUpDown = async() => {
    try {
      let res = await axios.get(`/api/avotes/${user.id}-${answer.id}`)
      // console.log("votecheck", res.data[0])
      setVote(res.data[0])
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

  const getUpVoteCount = async() => {
    try {
      let res = await axios.get(`/api/answers/${answer.id}/upvotes`)
      // console.log("answer upvotes", res.data[0].count)
      setUpVoteCount(res.data[0].count)
    } catch(err) {
      console.log("getUpVotes answer error", err)
      setUpVoteCount(0)
    }
  }

  const getDownVoteCount = async() => {
    try {
      let res = await axios.get(`/api/answers/${answer.id}/downvotes`)
      // console.log("answer downvotes", res.data[0].count)
      setDownVoteCount(res.data[0].count)
    } catch(err) {
      console.log("getDownVotes answer error", err)
      setDownVoteCount(0)
    }
  }

  const checkUpVote = () => {
    if (upVoted === true && downVoted === false) {
      deleteVote()
      alert("let's delete that vote")
    }
    else if (upVoted === false && downVoted === true) {
      updateUp()
      alert("let's change that vote to up")
    }
    else if (upVoted === false && downVoted === false) {
      upVote()
      alert("let's cast your vote!")
    }
    else (alert("peepee"))
  }

  const checkDownVote = () => {
    if (upVoted === false && downVoted === true) {
      deleteVote()
      alert("let's delete that vote")
    }
    else if (upVoted === true && downVoted === false) {
      updateDown()
      alert("let's change that vote to down")
    }
    else if (upVoted === false && downVoted === false) {
      downVote()
      alert("let's cast your vote!")
    }
    else (alert("poop"))
  }

  const deleteVote = async() => {
    try {
      let res = await axios.delete(`/api/avotes/${vote.id}`)
      // console.log(res)
      setUpVoted(false)
      setDownVoted(false)
    } catch (err) {
      console.log("deleteVote error", err)
    }
  }
  
  const updateUp = async() => {
    try {
      let res = await axios.put(`/api/avotes/${vote.id}`, {
        up: true,
        down: false
      })
      // console.log(res)
      checkUpDown()
    } catch (err) {
      console.log("updateVote error", err)
    }
  }

  const updateDown = async() => {
    try {
      let res = await axios.put(`/api/avotes/${vote.id}`, {
        up: false,
        down: true
      })
      // console.log(res)
      checkUpDown()
    } catch (err) {
      console.log("updateVote error", err)
    }
  }

  const upVote = async() => {
    try {
      let res = await axios.post(`/api/avotes`, {
        up: true,
        down: false,
        user_id: user.id,
        answer_id: answer.id,
        vote_code: `${user.id}-${answer.id}`
      })
      // console.log("upVote", res)
      checkUpDown()
    } catch(err) {
      console.log(err)
    }
  }

  const downVote = async() => {
    try {
      let res = await axios.post(`/api/avotes`, {
        up: false,
        down: true,
        user_id: user.id,
        answer_id: answer.id,
        vote_code: `${user.id}-${answer.id}`
      })
      // console.log("downVote", res)
      checkUpDown()
      } catch(err) {
      console.log(err)
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
         onClick={() => {
           checkUpVote()}}/>
        {/* <p style={styles.likesNumber}>{answerLikes}</p> */}
        <AiFillCaretDown
        size="40px"         
        color={downVoted ? "#6E54A3":"#757575"}
        onClick={() => {
          checkDownVote()}}/>
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