import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

const BoxLoader = () => {
  return (
    <Card style={{padding: '20px'}}>
      <Placeholder as='p' animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as='p' animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
    </Card>
  )
}

export default BoxLoader;