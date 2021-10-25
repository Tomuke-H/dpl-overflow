import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'
import '../../stylesheets/SortSelector.css'


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
      <div className="wrapper">
        <div className={sortBy === 'all' && !showTags ? 'left-tabActive' : 'left-tab'} onClick={(e)=> getQuestions('all', 1)}>Popular</div >
        <div className={(sortBy === 'unanswered' && !showTags) ? 'tabActive' : 'tab'} onClick={(e)=> getQuestions('unanswered', 1)}>Unanswered</div >
        <div className={(sortBy === 'follow' && !showTags) ? 'tabActive2' : 'tab2'} onClick={(e)=> getQuestions('follow', 1)}>Following</div >
        <div className={showTags ? 'right-tabActive' : 'right-tab'} onClick={(e)=> setShowTags(!showTags)}>Search by Tag</div >
      </div>
      
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
  multiSelect: {
    chips: {
      background: '#6E54A3',
    },
    searchBox: {
      maxWidth: '442px'
    },
  }
}

export default SortSelector;