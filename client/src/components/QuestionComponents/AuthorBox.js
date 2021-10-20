import React from "react"
import QuestionAuthor from "./QuestionAuthor"
import { day, time } from "../DayConverter/Dates"

const AuthorBox = ({question}) => {

  return(
    <div style={styles.authorBox}>
      <p> {QuestionAuthor(question.id)} / {day(question.created_at)} / {time(question.created_at)} </p>
    </div>
  )
}

const styles= {
  authorBox: {
    margin: "30px",
    padding: "10px",
    width: "120px",
    height: "50px",
    backgroundColor: "#C4C4C4",
    fontFamily: "Inter",
    fontWeight: "500px",
    fontSize: "10px",

  }
}

export default AuthorBox