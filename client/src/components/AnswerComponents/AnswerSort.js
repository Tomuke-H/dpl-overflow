import React from 'react'
import { ListGroup } from 'react-bootstrap'


const AnswerSort = ({sortBy, setSortBy, getAnswers}) => {

  return (
    <div>
      <ListGroup horizontal>
        <ListGroup.Item style={sortBy === 'oldest' ? styles.tabActive : styles.tab} 
        onClick={(e)=> {setSortBy('oldest'); getAnswers('oldest')}}>Oldest</ListGroup.Item >
        <ListGroup.Item style={sortBy === 'newest' ? styles.tabActive : styles.tab} 
        onClick={(e)=> {setSortBy('newest'); getAnswers('newest')}}>Newest</ListGroup.Item >
        <ListGroup.Item style={sortBy === 'likes' ? styles.tabActive : styles.tab} 
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