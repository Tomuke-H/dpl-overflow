import React from "react"
import TomHead from '../icons/Tom Headshot Option 3.jpg'
import MacHead from '../icons/MicHeadShot.jpg'
import MichaelHead from '../icons/MichaelHead.jpeg'
import SydHeadShot from '../icons/SydHeadShot.png'
import Julie from '../icons/Julie.jpg'

const AboutUs = () =>{

  const teamInfo = [
    {name: "Tom Hohl",
    position:"Student of Fall 2021",
    description:"Theatre Technician turned Software Developer",
    img:`${TomHead}`
    },
    {name: "Michaela Sivertsen",
    position:"Student of Fall 2021",
    description:"Warehouse Wizard turned Software Developer",
    img:`${MacHead}`
    },
    {name: "Sydney Orr",
    position:"Student of Fall 2021",
    description:"Bjorn's Barista turned Software Developer",
    img:`${SydHeadShot}`
    },
    {name: "Julie Tang",
    position:"Student of Fall 2021",
    description:"BioReagents Formulator turned Software Developer",
    img:`${Julie}`
    },
    {name: "Michael Cheung",
    position:"Student of Fall 2021",
    description:"Chemical Engineer Grad turned Software Developer",
    img:`${MichaelHead}`
    },
  ]

  const staff = [
    {name: "James Yeates",
    position:"Instructor of Fall 2021",
    description:"Took over Dani's position for guiding the project after her departure",
    },
    {name: "Will Liang",
    position:"Layout Provider",
    description:"Provided guidelines for how they wanted the interface to look as well as what functionality was desired.",
    },
    {name: "Dani Dona",
    position:"Teacher's assistant",
    description:"Left us Oct 15th for a new job",
    },
  ]


  const team = ()=>{
    return teamInfo.map((member,ind)=>{
      return(
      <div style={styles.gridteam} key={ind}>
        <img variant="top" src={member.img} style={styles.img} />
        <p style={styles.header}>{member.name}</p>
        <p style={styles.sub} >{member.position}</p>
        <hr style={{width:"55px", height:"1.5px", margin:"0px 0px 0px 5px"}}/>
        <p style={styles.bio}>{member.description}</p>
      </div>
      )
    })
  }

  const teachers = ()=>{
    return staff.map((member,ind)=>{
      return(
      <div style={styles.gridstaff} key={ind}>
        <img variant="top" src={member.img} style={styles.img} />
        <p style={styles.header}>{member.name}</p>
        <p style={styles.sub}>{member.position}</p>
        <hr style={{width:"55px", height:"1.5px", margin:"0px 0px 0px 5px"}}/>
        <p style={styles.bio}>{member.description}</p>
      </div>
      )
    })
  }


  return(
    <div style={styles.container}>
      <h1 style={{margin:"0px 0px 0px 20px", fontWeight: "600"}}>OUR TEAM</h1>
      <div style={styles.gridlayoutforteam}>
      {team()}
      </div>
      <br />
      <br />
      <br />
      <h1 style={{margin:"0px 0px 0px 20px",textAlign:"center"}}>Assisting Staff</h1>
      <div style={styles.gridlayoutforstaff}>
      {teachers()}
      </div >
    </div>
  )

}

const styles ={
  container: {
    margin:"60px 75px 0px 75px", 
    padding:"10px",
  },

  gridlayoutforteam:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
  },
  
  gridlayoutforstaff:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center"
  },

  gridteam:{
    margin: "20px",
    flexBasis: `calc(100% / 5 - 40px)`,
  },

  gridstaff:{
    margin: "20px",
    flexBasis: `calc(100% / 5 - 40px)`,
  },

  img:{
    height:"auto",
    width:"100%",
  },
  sub:{
    margin: "5px",
  },
  header:{
    margin: "5px",
    fontWeight:" 600",
  },
  bio:{
    margin: "5px",
    fontWeight:"500",
  },
}

export default AboutUs