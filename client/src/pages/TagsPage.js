import axios from "axios"
import React, { useEffect, useState } from "react"
import { Alert} from "react-bootstrap"
import { useHistory } from "react-router"
import { TagPagePill } from "../components/TagComponents/TagPill"
import { DPLButton } from "../components/DPLButtons"


const TagsPage = () => {
  const [tags, setTags] = useState([])
  const [tagSearch, setTagSearch] = useState([])
  const history = useHistory()

  useEffect(()=>{
    getTags();
  },[]);

  useEffect(()=>{
    getTag();
  },[tagSearch]);

  const getTags = async () => {
    try {
      let res = await axios.get("/api/tags")
      setTags(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTags = () => {
    return tags.map((t,ind)=>{
      return(
        <div style={styles.gridChild} key={ind} onClick={()=> history.push('/dashboard', t)}>
          <TagPagePill>{t.name}</TagPagePill>
          <p style={styles.descript}>Tag description</p>
        </div> 
      )
    })
  }
  const renderBadSearch = () => {
      return(
        <Alert variant="danger">No Results</Alert>
      )
  }

  const getTag = async () =>{
    if(tagSearch.length ===0){return reset()}
    try {
      let res = await axios.get(`/api/tag/${tagSearch}`)
      if(res.data.length > 0){
        setTags(res.data)
      }else{
        setTags([])
      }
    } catch (err) {
      console.log(err)
    }}

  const reset = () =>{
    setTagSearch("")
    getTags()
  }

  const renderSearch = () => {
    return(
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"self-end"}}>
        <div>
          <form onSubmit={(e) => {e.preventDefault()}}>
            <input 
            style = {styles.input}
            type="text"
            placeholder="Search"
            value = {tagSearch}
            onChange={(e) => {
            setTagSearch(e.target.value)}}/>
          </form>
            <DPLButton onClick={()=>{reset()}}>Reset Search</DPLButton>
        </div>
      </div>
    )
  }

  return(
    <div style={styles.container}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
      <h1 style={styles.header}>Tags</h1>
      {renderSearch()}
      </div>
      <div style={styles.grid}>
      {renderTags()}
      {tags.length === 0 && renderBadSearch()}
      </div>
    </div>
  )
}

const styles ={
  container: {
    margin:"60px 95px 0px 95px", 
    padding:"10px",
  },
  grid:{
    display:"flex",
    flexWrap:"wrap",
    margin: "80px 0px 0px 0px",
    border: "1px solid black",
    borderRadius:"6px",
    backgroundColor:"#ffffff",
    padding: "20px 40px 20px 40px",
  },

  gridChild:{
    margin: "15px",
    border:"2px solid #6E54A3",
    flexBasis: `calc(100% / 4 - 30px)`,
    textTransform: "capitalize",
    borderRadius: "6px",
  },

  header: {
    fontWeight: "500px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  
  descript: {
    margin: "10px",
    color: "#000000",
  },
  input: {
    borderRadius:"20px",
    padding:"7px 0px 8px 15px",
  },
}



export default TagsPage