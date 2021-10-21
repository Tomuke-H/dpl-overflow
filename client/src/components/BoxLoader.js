import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

const BoxLoader = () => {
  return (
    <Card style={{padding: '20px'}}>
      <Placeholder as='p' animation="glow">
        <Placeholder xs={12} bg="secondary"/>
      </Placeholder>
      <Placeholder as='p' animation="glow">
        <Placeholder xs={12} bg="secondary"/>
      </Placeholder>
    </Card>
  )
}

export default BoxLoader;