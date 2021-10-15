import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'

// const renderTags = () => {
//   return tags.map(t => {
//     return (
//         <Button key={t.id} onClick={(e)=>getQuestions('tag', 1, t.name)}>{t.name}</Button>
//     )
//   })
// }

const SortSelector = ({getQuestions, setShowTags, tagSearch, setTagSearch, tags, showTags}) => {
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
      <Button onClick={(e)=> getQuestions('all', 1)}>Popular</Button>
      <Button onClick={(e)=> getQuestions('unanswered', 1)}>Unanswered</Button>
      <Button onClick={(e)=> setShowTags(!showTags)}>Search by Tag</Button>
      
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

export default SortSelector;