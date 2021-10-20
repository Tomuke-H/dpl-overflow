import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"

const AnswerVote = ({answer, liked_answers, downvote_answers}) => {
  const{setUser} = useContext(AuthContext)
  const [la, setLA] = useState(liked_answers); // la = liked answers
  const [isLA, setIsLA] = useState(false);
  const [da, setDA] = useState(downvote_answers); // Da = downvote answers
  const [isDA, setIsDA] = useState(false);
  // okay got it working but would like to keep track of whether a user has already liked or not - limit one like per user, right?

  const saveUpVote = async () => {
    try{
    await axios.put(`/api/questions/${answer.question_id}/answers/${answer.id}`, { 
      likes: answerLikes + 1
    })
    // console.log(res)
  } catch (err) {
      console.log("upvote error", err)
    }
  }


  const saveDownVote = async () => {
    try{
    await axios.put(`/api/questions/${answer.question_id}/answers/${answer.id}`, { 
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

    useEffect(()=>{
      checkLA()
      checkDA()
    },[])

  const checkLA = () => {
    if(liked_answers.length !==0 ){
      if(la.includes(answer.id) === true){
        setIsLA(true)
      }
    }
  }

  const handleLA = async () =>{
    if(isLA){
      try {
        let unLA = la.filter((i) => i !== answer.id)
        let res = await axios.put(`/api/likeanswer`, {liked_answers: unLA})
        setUser(res.data)
        setLA(unLA)
        setIsLA(false)        
      } catch (err) {
        console.log(err)
      }
    }else{
      try {
        la.push(answer.id)
        let res = await axios.put(`/api/likeanswer`, {liked_answers: la})
        setLA(la)
        setUser(res.data)
        setIsLA(true)
      } catch (err) {
        console.log(err)
      }
    }
  }
  const checkDA = () => {
    if(liked_answers.length !==0 ){
      if(la.includes(answer.id) === true){
        setIsDA(true)
      }
    }
  }

  const handleDA = async () =>{
    if(isDA){
      try {
        let unDA = la.filter((i) => i !== answer.id)
        let res = await axios.put(`/api/downvoteanswer`, {downvote_answers: unDA})
        setUser(res.data)
        setDA(unDA)
        setIsDA(false)        
      } catch (err) {
        console.log(err)
      }
    }else{
      try {
        da.push(answer.id)
        let res = await axios.put(`/api/downvoteanswer`, {downvote_answers: da})
        setDA(da)
        setUser(res.data)
        setIsDA(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

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
    fontWeight: "500px",
    display: "flex",
    alignItems: "center",
    letterSpacing: ".5px",
    color: "#000000",
  },
  }

export default AnswerVote;