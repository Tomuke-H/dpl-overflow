import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'


// const renderTags = () => {
//   return tags.map(t => {
//     return (
//         <Button key={t.id} onClick={(e)=>getQuestions('tag', 1, t.name)}>{t.name}</Button>
//     )
//   })
// }

const SortSelector = ({selectedValues, setSelectedValues, sortBy, getQuestions, setShowTags, tagSearch, setTagSearch, tags, showTags}) => {
  const options = tags

  

  const handleAddTag = (id, list) => {
    if(tagSearch.length === 0){
      getQuestions('tag', 1, id)
      setSelectedValues(list)
      setTagSearch([...tagSearch, id])
    } else {
      setTagSearch([...tagSearch, id])
      setSelectedValues(list)
      getQuestions('tag', 1, [...tagSearch, id])
    }
  }

  const handleRemoveTag = (id, list) => {
    if(tagSearch.filter(t=>t !== id).length === 0){
      getQuestions('all', 1)
    } else {
      getQuestions('tag', 1, tagSearch.filter(t => t !== id))
    }
    let filteredTags = tagSearch.filter(t => t !== id)
    setTagSearch(filteredTags)
    setSelectedValues(list)
  }
  return (
    <div>
      <ListGroup horizontal>
        <ListGroup.Item style={sortBy === 'all' && !showTags ? styles.tabActive : styles.tab} onClick={(e)=> getQuestions('all', 1)}>Popular</ListGroup.Item >
        <ListGroup.Item style={(sortBy === 'unanswered' && !showTags) ? styles.tabActive : styles.tab} onClick={(e)=> getQuestions('unanswered', 1)}>Unanswered</ListGroup.Item >
        <ListGroup.Item style={(sortBy === 'follow' && !showTags) ? styles.tabActive : styles.tab} onClick={(e)=> getQuestions('follow', 1)}>Following</ListGroup.Item >
        <ListGroup.Item style={showTags ? styles.tabActive : styles.tab} onClick={(e)=> setShowTags(!showTags)}>Search by Tag</ListGroup.Item >
      </ListGroup>
      
      {showTags && <Multiselect 
        style={styles.multiSelect}
        options={options}
        selectedValues={selectedValues}
        onSelect={(selectedList, selectedItem) => handleAddTag(selectedItem.id, selectedList)}
        onRemove={(selectedList, selectedItem) => handleRemoveTag(selectedItem.id, selectedList)}
        closeIcon='cancel'
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
  },
  multiSelect: {
    chips: {
      background: '#6E54A3',
    },
  }
}

export default SortSelector;