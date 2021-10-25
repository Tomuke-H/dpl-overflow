import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"

const QuestionVote = ({question}) => {
  const{user} = useContext(AuthContext)
  const[voteUsers, setVoteUsers] = useState([])
  const[vote, setVote] = useState({})
  const[upVoted, setUpVoted] = useState(false)
  const[downVoted, setDownVoted] = useState(false)
  const[upVotes, setUpVotes] = useState()
  const[downVotes, setDownVotes] = useState()

  
  useEffect(() => {
    getUserVotes();
    getUpVotes();
    getDownVotes();
  }, [])

  const getUserVotes = async() => {
    try {
      let res = await axios.get(`/api/questions/${question.id}/users`)
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

  const getUpVotes = async() => {
    try {
      let res = await axios.get(`/api/questions/${question.id}/upvotes`)
      console.log("upvotes", res)
    } catch(err) {
      console.log("getUpVotes error", err)
    }
  }

  const getDownVotes = async() => {
    try {
      let res = await axios.get(`/api/questions/${question.id}/downvotes`)
      console.log("downvotes", res)
    } catch(err) {
      console.log("getDownVotes error", err)
    }
  }

  // const getTotalAnswers

  const checkUpVote = () => {
    if (upVoted === true && downVoted === false) {
      // deleteVote()
      alert("let's delete that vote")
    }
    else if (upVoted === false && downVoted === true) {
      // updateUp()
    }
    else if (upVoted === false && downVoted === false) {
      alert("let's cast your vote!")
      upVote()
    }
    else (alert("peepee"))
  }

  const checkDownVote = () => {
    if (upVoted === false && downVoted === true) {
      // deleteVote()
      alert("let's delete that vote")
    }
    else if (upVoted === true && downVoted === false) {
      // updateDown()
      alert("let's change that vote to down")
    }
    else if (upVoted === false && downVoted === false) {
      alert("let's cast your vote!")
      downVote()
    }
    else (alert("poop"))
  }

  const deleteVote = async() => {

  }
  
  const updateUp = async() => {

  }

  const updateDown = async() => {

  }

 

  const upVote = async() => {
    try {
      let res = await axios.post(`/api/questions/${question.id}/qvotes`, {
        up: true,
        down: false,
        user_id: user.id,
        question_id: question.id,
        vote_code: `${user.id}-${question.id}`
      })
      console.log("upVote", res)
    } catch(err) {
      console.log(err)
    }
  }

  const downVote = async() => {
    try {
      let res = await axios.post(`/api/questions/${question.id}/qvotes`, {
        up: false,
        down: true,
        user_id: user.id,
        question_id: question.id,
        vote_code: `${user.id}-${question.id}`
      })
      console.log("downVote", res)
    } catch(err) {
      console.log(err)
    }
  }

  // const checkIfVote = () => {
  //   if (voteUsers.includes(user.id)){
  //     checkUpDown();
  //   }
  // }

  const checkUpDown = async() => {
    try {
      let res = await axios.get(`/api/qvotes/${user.id}-${question.id}`)
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

//   const saveUpVote = async () => {
//     try{
//       await axios.put(`/api/questions/${question.id}`, {
//       likes: likes + 1
//     })
//     // console.log(res)
//   } catch (err) {
//       console.log("upvote error", err)
//     }
//   }

//   const saveDownVote = async () => {
//     try{
//     await axios.put(`/api/questions/${question.id}`, {
//       likes: likes - 1
//     })
//     // console.log(res)
//   } catch (err) {
//       console.log("downvote error", err)
//     }
//   }
  
//   const upVote = () =>{
//     dispatch("add");
//     saveUpVote(likes)
//   }

//   const downVote = () =>{
//     dispatch("subtract");
//     saveDownVote(likes)
//   }

// const [likes, dispatch] = useReducer((state, action) => {
//   switch (action) {
//     case "add":
//       return state + 1;
//     case "subtract":
//       return state - 1;
//   }
// }, question.likes);
  
  return (
    <div style={styles.voteBox}>
      <AiFillCaretUp
      size="40px"
      color={upVoted ? "#6E54A3":"#757575"}
        onClick={() => {
          checkUpVote()}
        }/>
      {/* <p style={styles.likesNumber}>{likes}</p> */}
      <AiFillCaretDown
      size="40px"
      color={downVoted ? "#6E54A3":"#757575"}
      onClick={() => {
        checkDownVote()}}/>
    </div>
  );
};

  const styles = {
  voteBox: {
    position: "absolute",
    top: "189px",
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

export default QuestionVote;