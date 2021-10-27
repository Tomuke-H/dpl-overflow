import React, { useContext } from "react";
import { Container, Image } from "react-bootstrap";
import { DPLButton } from "../components/DPLButtons";
import { Link, NavLink } from "react-router-dom";
import DPLLandingR from "../icons/DPLandingR.png"
import DPLandingL from "../../src/icons/DPLandingL.png"
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const {user} = useContext(AuthContext)

  const buttonLink = () => {
    if(user){
      return (
        <NavLink as={Link} to="/Dashboard">
          <DPLButton>DASHBOARD</DPLButton>
        </NavLink>
      )
    } else {
      return (
        <NavLink as={Link} to="/register">
          <DPLButton>GET STARTED</DPLButton>
        </NavLink>
      )
    }
  }

  return (
    <div style={styles.row}>
      <div style={styles.column1}>
        <Image src={DPLandingL} style={styles.leftpic} />
        <br />
        <Container style={styles.consize}>
          <p style={styles.textstyle}>Think Stack Overflow but solely for the DevPoint Labs
            / DevPoint Studios Community. Focused on homework, whiteboard
            questions and all things code.
          </p>
          {buttonLink()}
        </Container>
      </div>
      <div style={styles.column2}>
        <Image src={DPLLandingR} style={styles.rightpic} />
      </div>
    </div>
  )
}

export default Home;


const styles = {
  leftpic: {
    display: "flex",
    width: "75%",
    margin: "0px",
  },

  rightpic: {
    display: "flex",
    width: "100%",
  },

  row: {
    display: "flex",
  },

  column1: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    flexDirection: "column",
    float: "left",
    width: "50%",
  },

  consize: {
    width: "75%",
    margin: "0px",
  },

  textstyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "33px",
    color: "#545454",
  },

  column2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    float: "right",
    width: "50%",
    height: "85vh",
  },
}