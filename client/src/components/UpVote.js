import axios from "axios";
import React, { useContext, useReducer } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

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
      <p>
        <Button
         onClick={() => {upVote()}}>
          UP 
        </Button>
        {likes}
        <Button
         onClick={() => {downVote()}}>
           DOWN
        </Button>
      </p>
    );
  };


export default UpVote;