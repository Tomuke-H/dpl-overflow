import React, { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'
import DPLButton from '../DPLButton'
import { dplPurple } from '../Color'

// const renderTags = () => {
//   return tags.map(t => {
//     return (
//         <Button key={t.id} onClick={(e)=>getQuestions('tag', 1, t.name)}>{t.name}</Button>
//     )
//   })
// }

const SortSelector = ({sortBy, getQuestions, setShowTags, tagSearch, setTagSearch, tags, showTags}) => {
  const options = tags

  const [selectedValue, setSelectedValues] = useState([])

  const handleAddTag = (name) => {
    if(tagSearch.length === 0){
      getQuestions('tag', 1, name)
      setTagSearch([...tagSearch, name])
    } else {
      setTagSearch([...tagSearch, name])
      getQuestions('tag', 1, [...tagSearch, name])
    }
  }

  const handleRemoveTag = (name) => {
    if(tagSearch.filter(t=>t != name).length === 0){
      getQuestions('all', 1)
    } else {
      getQuestions('tag', 1, tagSearch.filter(t => t != name))
    }
    let filteredTags = tagSearch.filter(t => t !== name)
    setTagSearch(filteredTags)
  }
  return (
    <div>
      <ListGroup horizontal>
        <ListGroup.Item style={sortBy == 'all' && !showTags ? styles.tabActive : styles.tab} onClick={(e)=> getQuestions('all', 1)}>Popular</ListGroup.Item >
        <ListGroup.Item style={(sortBy == 'unanswered' && !showTags) ? styles.tabActive : styles.tab} onClick={(e)=> getQuestions('unanswered', 1)}>Unanswered</ListGroup.Item >
        <ListGroup.Item style={showTags ? styles.tabActive : styles.tab} onClick={(e)=> setShowTags(!showTags)}>Search by Tag</ListGroup.Item >
      </ListGroup>
      
      {showTags && <Multiselect 
        options={options}
        selectedValues={selectedValue}
        onSelect={(selectedList, selectedItem) => handleAddTag(selectedItem.name)}
        onRemove={(selectedList, selectedItem) => handleRemoveTag(selectedItem.name)}
        displayValue="name"
      />}
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

export default SortSelector;