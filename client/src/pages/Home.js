import React from "react";
import DPOverflowPlaceholder from "../icons/DPOverflowPlaceholder.png";
import { Container, Image } from "react-bootstrap";
import { DPLButton } from "../components/DPLButtons";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.row}>
      <div style={styles.column1}>
        <Image src={DPOverflowPlaceholder} style={styles.leftpic} />
        <br />
        <Container style={styles.consize}>
          <p style={styles.textstyle}>Think Stack Overflow but solely for the DevPoint Labs
            / DevPoint Studios Community. Focused on homework, whiteboard
            questions and all things code.
          </p>
          <NavLink as={Link} to="/register">
            <DPLButton>GET STARTED</DPLButton>
          </NavLink>
        </Container>
      </div>
      <div style={styles.column2}>
        <h2>Dashboard Image Here</h2>
      </div>
    </div>
  )
}

export default Home;


const styles = {
  leftpic: {
    display: "flex",
    width: "75%",
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
    marginBottom: "100px",
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
    height: "100vh",
  },
}