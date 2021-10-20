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

const SortSelector = ({sortBy, getQuestions, setShowTags, tagSearch, setTagSearch, tags, showTags}) => {
  const options = tags

  const [selectedValue, setSelectedValues] = useState([])

  const handleAddTag = (id) => {
    if(tagSearch.length === 0){
      getQuestions('tag', 1, id)
      setTagSearch([...tagSearch, id])
    } else {
      setTagSearch([...tagSearch, id])
      getQuestions('tag', 1, [...tagSearch, id])
    }
  }

  const handleRemoveTag = (id) => {
    if(tagSearch.filter(t=>t !== id).length === 0){
      getQuestions('all', 1)
    } else {
      getQuestions('tag', 1, tagSearch.filter(t => t !== id))
    }
    let filteredTags = tagSearch.filter(t => t !== id)
    setTagSearch(filteredTags)
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
        options={options}
        selectedValues={selectedValue}
        onSelect={(selectedList, selectedItem) => handleAddTag(selectedItem.id)}
        onRemove={(selectedList, selectedItem) => handleRemoveTag(selectedItem.id)}
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