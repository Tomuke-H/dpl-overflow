import React, { useEffect } from "react";
import styled from 'styled-components'
import useAxiosOnMount from "../hooks/useAxiosOnMount";

export default function Things() {

  const { data:things, error, loading } = useAxiosOnMount('/api/things')


  return (
    <div>
      <h1>Things</h1>
      <Text>Styled Test</Text>
      <p>{JSON.stringify(things)}</p>
    </div>
  );
}

const Text = styled.p`
    color: red;
`