import React from 'react'
import { Button } from 'react-bootstrap'

const SortSelector = ({getQuestions, setShowTags, showTags}) => {
  return (
    <div>
      <Button onClick={(e)=> getQuestions('all', 1)}>Show All</Button>
      <Button onClick={(e)=> getQuestions('unanswered', 1)}>Unanswered</Button>
      <Button onClick={(e)=> setShowTags(!showTags)}>Search by Tag</Button>
    </div>
  )
}

export default SortSelector;