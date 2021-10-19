import React, { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'
import DPLButton from '../DPLButtons'
import { dplPurple } from '../Color'

const AnswerSort = ({sortBy, setSortBy, getAnswers}) => {
  const [selectedValue, setSelectedValues] = useState([])

  return (
    <div>
      <ListGroup horizontal>
        <ListGroup.Item style={sortBy == 'oldest' ? styles.tabActive : styles.tab} 
        onClick={(e)=> {setSortBy('oldest'); getAnswers('oldest')}}>Oldest</ListGroup.Item >
        <ListGroup.Item style={sortBy == 'newest' ? styles.tabActive : styles.tab} 
        onClick={(e)=> {setSortBy('newest'); getAnswers('newest')}}>Newest</ListGroup.Item >
        <ListGroup.Item style={sortBy == 'likes' ? styles.tabActive : styles.tab} 
        onClick={(e)=> {setSortBy('likes'); getAnswers('likes')}}>Popular</ListGroup.Item >
      </ListGroup>
    </div>
  )
}

const styles = {
  tab: {
    backgroundColor: 'white',
  }, 
  tabActive: {
    backgroundColor: '#757575',
    color: 'white',
  }
}

export default AnswerSort;