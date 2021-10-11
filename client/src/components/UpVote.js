import axios from "axios";
import React, { useContext, useReducer } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const UpVote = ({question}) => {
  const {user} = useContext(AuthContext)

  //LOOK AT THIS AXIOS CALL TOMORROW
  //getting a 404 error

  const saveQuestionLikes = async () => {
    try{
    let res = await axios.put(`/api/users/${question.user_id}/questions/${question.id}`, {
      id: question.id,
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