import React, { useState } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { css } from '@emotion/react'
import { Button, Card } from 'semantic-ui-react';

const override = css`
  display: flex;
  margin: 50px;
  border-color: red;
  justify-content: center;
`;

const PropagateLoaderDemo = () => {
    const [loading, setLoading] = useState(true)

    return (
        <Card>
            <Card.Content >
                <PropagateLoader color="#4ae2d7" css={override} loading={loading}/>
            </Card.Content>
            <Button color='blue' onClick={() => setLoading(!loading)}>Toggle Loading</Button>
        </Card>
    )
} 

export default PropagateLoaderDemo;