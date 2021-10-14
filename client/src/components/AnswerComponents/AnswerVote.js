import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"
import { AuthContext } from "../../providers/AuthProvider";


const AnswerVote = ({answer}) => {
  // const {user} = useContext(AuthContext)

  // okay got it working but would like to keep track of whether a user has already liked or not - limit one like per user, right?

  const saveUpVote = async () => {
    try{
    let res = await axios.put(`/api/questions/${answer.question_id}/answers/${answer.id}`, { 
      likes: answerLikes + 1
    })
    // console.log(res)
  } catch (err) {
      console.log("upvote error", err)
    }
  }


  const saveDownVote = async () => {
    try{
    let res = await axios.put(`/api/questions/${answer.question_id}/answers/${answer.id}`, { 
      likes: answerLikes - 1
    })
    // console.log(res)
  } catch (err) {
      console.log("downvote error", err)
    }
  }
  
    const upVote = () =>
    {dispatch("add");
    saveUpVote(answerLikes)}

    const downVote = () =>
    {dispatch("subtract");
    saveDownVote(answerLikes)}

  
    const [answerLikes, dispatch] = useReducer((state, action) => {
      switch (action) {
        case "add":
          return state + 1;
        case "subtract":
          return state - 1;
      }
    }, answer.likes);
  
    return (
      <div style={styles.likeBox}>
        <AiFillCaretUp
        size="40px"
        color="#757575"
         onClick={() => {upVote()}}/>
        <p style={styles.likesNumber}>{answerLikes}</p>
        <AiFillCaretDown
        size="40px"         
        color="#757575"
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
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    letterSpacing: ".5px",
    color: "#000000",
  },
  }

export default AnswerVote;