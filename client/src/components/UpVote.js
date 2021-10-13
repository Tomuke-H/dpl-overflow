import axios from "axios";
import React, { useContext, useReducer, useEffect } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"
import WebFont from "webfontloader";


const UpVote = ({question}) => {
  const {user} = useContext(AuthContext)

  // okay got it working but would like to keep track of whether a user has already liked or not - limit one like per user, right?

  const saveQuestionLikes = async () => {
    try{
    let res = await axios.put(`/api/questions/${question.id}`, {
      likes: likes + 1
    })
    console.log(res)
  } catch (err) {
      console.log(err)
    }
  }
  
    const upVote = () =>
    {dispatch("add");
    saveQuestionLikes(likes)}

    const downVote = () =>
    {dispatch("subtract");
    saveQuestionLikes(likes)}

  
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

export default UpVote;