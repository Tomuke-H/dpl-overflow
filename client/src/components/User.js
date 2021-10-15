import React from "react";
import { Container, Image } from "react-bootstrap";

const User = ({user}) => {


return (
  <>
  <div>
      <Container style={{textAlign:'center'}}>
            <Image style={styles.circle} alt="100x100" src={user.image} roundedCircle data-holder-rendered="true"/>
          <p>{user.name}</p>
          <p>{user.cohort}</p>
      </Container>
  </div>
</>
)
};

export default User;

const styles = {
  circle: {
    width: '137px',
    height: '137px',
    left: '104.5px',
    top: '265px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "center"
 },
}