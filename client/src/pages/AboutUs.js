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
    position:"Instructor of Fall 2021",
    description:"Took over Dani's position for guiding the project after her departure",
    img:"https://images-na.ssl-images-amazon.com/images/I/61LLhx0YtdL.jpg"
    },
    {name: "Will Liang",
    position:"Layout Provider",
    description:"Provided guidelines for how they wanted the interface to look as well as what functionality was desired.",
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
        <Card.Img variant="top" src={member.img} style={styles.img} />
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
        <Card.Img variant="top" src={member.img} style={styles.img} />
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
      <Container style={styles.gridlayoutforteam}>
      {team()}
      </Container>
      <Container style={styles.gridlayoutforstaff}>
      {teachers()}
      </Container>
    </div>
  )

}

const styles ={
  gridlayoutforteam:{
    display:"flex",
    flexWrap:"wrap",
    margin: "20px",
    justifyContent:"center"
  },
  
  gridlayoutforstaff:{
    display:"flex",
    flexWrap:"wrap",
    margin: "20px",
    justifyContent:"center"
  },

  gridteam:{
    margin: "5px",
    flexBasis: `calc(100% / 5 - 10px)`,
  },

  gridstaff:{
    margin: "5px",
    flexBasis: `calc(100% / 5 - 10px)`,
  },

  img:{
    height:"auto",
    width:"100%"
  }
}

export default AboutUs