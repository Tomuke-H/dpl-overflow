import React, { useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components'

export default function Things() {

    useEffect(()=>{
        getThings()
    }, [])

    const getThings = async () => {
        try {
            let res = await axios.get("/api/things")
            console.log(res.data)
        }catch (err){

        }
    }
  return (
    <div>
      <h1>Things</h1>
      <Text>Styled Test</Text>
    </div>
  );
}

const Text = styled.p`
    color: red;
`