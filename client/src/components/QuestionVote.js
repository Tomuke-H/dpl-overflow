import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"


const QuestionVote = ({question, liked_questions}) => {
  const{setUser} = useContext(AuthContext)
  const [lq, setLQ] = useState(liked_questions); // lq = liked Questions
  const [isLQ, setIsLQ] = useState(false);
  
  // okay got it working but would like to keep track of whether a user has already liked or not - limit one like per user, right?
  
  const saveUpVote = async () => {
    try{
    await axios.put(`/api/questions/${question.id}`, {
      likes: likes + 1
    })
    // console.log(res)
  } catch (err) {
      console.log("upvote error", err)
    }
  }

  const saveDownVote = async () => {
    try{
    await axios.put(`/api/questions/${question.id}`, {
      likes: likes - 1
    })
    // console.log(res)
  } catch (err) {
      console.log("downvote error", err)
    }
  }
  
    const upVote = () =>{
      dispatch("add");
      saveUpVote(likes)
    }

    const downVote = () =>{
      dispatch("subtract");
      saveDownVote(likes)
    }

    useEffect(()=>{
      checkLQ()
    },[])

  const checkLQ = () => {
    if(liked_questions.length !==0 ){
      if(lq.includes(question.id) === true){
        setIsLQ(true)
      }
    }
  }

  const handleLQ = async () =>{
    if(isLQ){
      try {
        let unLQ = lq.filter((i) => i !== question.id)
        let res = await axios.put(`/api/likequestion`, {liked_questions: unLQ})
        setUser(res.data)
        setLQ(unLQ)
        setIsLQ(false)        
      } catch (err) {
        console.log(err)
      }
    }else{
      try {
        lq.push(question.id)
        let res = await axios.put(`/api/likequestion`, {liked_questions: lq})
        setLQ(lq)
        setUser(res.data)
        setIsLQ(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  
    const [likes, dispatch] = useReducer((state, action) => {
      switch (action) {
        case "add":
          return state + 1;
        case "subtract":
          return state - 1;
      }
    }, question.likes);
  
    return (
      <div style={styles.voteBox}>
        <AiFillCaretUp
        size="40px"
        color="#757575"
         onClick={() => {upVote()}}/>
        <p style={styles.likesNumber}>{likes}</p>
        <AiFillCaretDown
        size="40px"
        color="#757575"
        onClick={() => {downVote()}}/>
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
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    letterSpacing: ".5px",
    color: "#000000",
  },
  }

export default QuestionVote;