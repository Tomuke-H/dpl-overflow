import React from "react"
import { Card, Container } from "react-bootstrap"

const AboutUs = () =>{

  const teamInfo = [
    {name: "Tom Hohl",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Michaela Sivertsen",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Sydney Orr",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Julie Tang",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Michael Cheung",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
  ]

  const staff = [
    {name: "James Yeates",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Will Liang",
    position:"Student of Fall 2021",
    description:"Put something here",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Dani Dona",
    position:"Teacher's assistant",
    description:"Left us Oct 15th for a new job",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
  ]


  const team = ()=>{
    return teamInfo.map((member,ind)=>{
      return(
      <Card style={styles.gridteam} key={ind}>
        <Card.Img variant="top" src={member.img} />
        <Card.Title>{member.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{member.position}</Card.Subtitle>
        <Card.Body>{member.description}</Card.Body>
      </Card>
      )
    })
  }

  const teachers = ()=>{
    return staff.map((member,ind)=>{
      return(
      <Card style={styles.gridstaff} key={ind}>
        <Card.Img variant="top" src={member.img} />
        <Card.Title>{member.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{member.position}</Card.Subtitle>
        <Card.Body>{member.description}</Card.Body>
      </Card>
      )
    })
  }


  return(
    <div>
      <h1>Our Team</h1>
      <Container style={styles.grid}>
      {team()}
      {teachers()}
      </Container>
    </div>
  )

}

const styles ={
  grid:{
    display:"flex",
    flexWrap:"wrap",
    margin: "20px"
  },

  gridteam:{
    margin: "5px",
    flexBasis: `calc(100% / 5 - 10px)`,
  },

  gridstaff:{
    margin: "5px",
    flexBasis: `calc(100% / 6 - 10px)`,
  }
}

export default AboutUs