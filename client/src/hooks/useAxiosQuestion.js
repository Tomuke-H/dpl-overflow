import axios from "axios";
import React, { useState } from "react";

const useAxiosQuestion = (sortCategory, page, tag) =>{
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getDataByTag = async (t, p) => {
    try{
      let res = await axios.get(`/api/find_question_by_tag/${t}?page=${p}`)
      setData(res.data)
    } catch (err){
      console.log(err)
    }
  }

  const getAllData = async (p) => {
    try{
      let res = await axios.get(`/api/questions?page=${p}`)
      setData(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const getData = (sC, p, t) => {
    switch (sC){
      case "all" :
        getAllData(p)
        break;
      case "tag" :
        getDataByTag(t, p)
        break;
      default:
        alert('Hook failed')
        break;
    }
  }

  getData(sortCategory, page, tag)

  return {data, loading, error}
}

export default useAxiosQuestion;