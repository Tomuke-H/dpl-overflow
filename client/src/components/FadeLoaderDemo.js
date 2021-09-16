import React, { useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from '@emotion/react'
import { Button, Card } from 'semantic-ui-react';

const override = css`
  display: flex;
  border-color: red;
`;

const FadeLoaderDemo = () => {
    const [loading, setLoading] = useState(true)

    return (
        <Card style={{margin: "20px", height: "200px"}}>
            <Card.Content >
                <FadeLoader color="#4ae2d7" css={override} loading={loading}/>
            </Card.Content>
            <Button color='blue' onClick={() => setLoading(!loading)}>Toggle Loading</Button>
        </Card>
    )
} 

export default FadeLoaderDemo;