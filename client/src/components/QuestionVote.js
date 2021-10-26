import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"

const QuestionVote = ({question}) => {
  const{user} = useContext(AuthContext)
  const[voteUsers, setVoteUsers] = useState([])
  const[vote, setVote] = useState()
  const[upVoted, setUpVoted] = useState(false)
  const[downVoted, setDownVoted] = useState(false)
  // const[upVoteCount, setUpVoteCount] = useState(0)
  // const[downVoteCount, setDownVoteCount] = useState(0)
  const[totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    getUserVotes();
    // getUpVoteCount();
    // getDownVoteCount();
    getVoteTotal();
  }, [])

  const getUserVotes = async() => {
    try {
      let res = await axios.get(`/api/questions/${question.id}/users`)
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
      let res = await axios.get(`/api/qvotes/${user.id}-${question.id}`)
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

    // const getUpVoteCount = async() => {
    //   try {
    //     let res = await axios.get(`/api/questions/${question.id}/upvotes`)
    //     // console.log("question upvotes", res.data[0].count)
    //     setUpVoteCount(res.data[0].count)
    //   } catch(err) {
    //     console.log("getUpVotes question error", err)
    //     setUpVoteCount(0)
    //   }
    // }

    // const getDownVoteCount = async() => {
    //   try {
    //     let res = await axios.get(`/api/questions/${question.id}/downvotes`)
    //     // console.log("question downvotes", res.data[0].count)
    //     setDownVoteCount(res.data[0].count)
    //   } catch(err) {
    //     console.log("getDownVotes answer error", err)
    //     setDownVoteCount(0)
    //   }
    // }
    
    const difference = (a, b) => {
      return a - b
    }

    const getVoteTotal = () => {
      let requestUp = axios.get(`/api/questions/${question.id}/upvotes`)
      let requestDown = axios.get(`/api/questions/${question.id}/downvotes`)
      axios.all([requestUp, requestDown]).then(axios.spread((...responses) => {
      let resUp = responses[0]
      let resDown = responses[1]
        if (resUp.data.length > 0 && resDown.data.length > 0) {
          let a = resUp.data[0].count
          let b = resDown.data[0].count
          setTotalVotes(difference(a,b))
          // console.log("total", difference(a,b)) 
        }
        else if (resUp.data.length > 0) {
          setTotalVotes(resUp.data[0].count)
          // console.log("total resup", resUp.data[0].count)
        }
        else if (resDown.data.length > 0) {
          setTotalVotes(0 - resDown.data[0].count)
          // console.log("total resdown", resDown.data[0].count)
        }
        else {setTotalVotes(0)}
        saveLikes()
})).catch(errors => {
  // react on errors.
  console.log(errors)
})
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
      let res = await axios.delete(`/api/qvotes/${vote.id}`)
      // console.log(res)
      setUpVoted(false)
      setDownVoted(false)
      getVoteTotal()
    } catch (err) {
      console.log("deleteVote error", err)
    }
  }
  
  const updateUp = async() => {
    try {
      let res = await axios.put(`/api/qvotes/${vote.id}`, {
        up: true,
        down: false
      })
      // console.log(res)
      checkUpDown()
      getVoteTotal()
    } catch (err) {
      console.log("updateVote error", err)
    }
  }

  const updateDown = async() => {
    try {
      let res = await axios.put(`/api/qvotes/${vote.id}`, {
        up: false,
        down: true
      })
      // console.log(res)
      checkUpDown()
      getVoteTotal()
    } catch (err) {
      console.log("updateVote error", err)
    }
  }

  const upVote = async() => {
    try {
      let res = await axios.post(`/api/qvotes`, {
        up: true,
        down: false,
        user_id: user.id,
        question_id: question.id,
        vote_code: `${user.id}-${question.id}`
      })
      // console.log("upVote", res)
      checkUpDown()
      getVoteTotal()
    } catch(err) {
      console.log(err)
    }
  }

  const downVote = async() => {
    try {
      let res = await axios.post(`/api/qvotes`, {
        up: false,
        down: true,
        user_id: user.id,
        question_id: question.id,
        vote_code: `${user.id}-${question.id}`
      })
      // console.log("downVote", res)
      checkUpDown()
      getVoteTotal()
    } catch(err) {
      console.log(err)
    }
  }

  const saveLikes = async () => {
    try{
      let res = await axios.put(`/api/questions/${question.id}`, {
      likes: totalVotes
    })
    console.log(res)
  } catch (err) {
      console.log("save likes", err)
    }
  }
  
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
      <p style={styles.likesNumber}>{totalVotes}</p>
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