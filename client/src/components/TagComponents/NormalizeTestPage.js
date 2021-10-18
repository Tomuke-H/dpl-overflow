
data = [
  {
      "id": 21,
      "tag_id": 4,
      "question_id": 23,
      "created_at": "2021-10-09T04:12:02.229Z",
      "updated_at": "2021-10-09T04:12:02.229Z"
  },
  {
      "id": 22,
      "tag_id": 5,
      "question_id": 23,
      "created_at": "2021-10-09T04:12:02.732Z",
      "updated_at": "2021-10-09T04:12:02.732Z"
  },
  {
      "id": 23,
      "tag_id": 6,
      "question_id": 23,
      "created_at": "2021-10-09T04:12:02.765Z",
      "updated_at": "2021-10-09T04:12:02.765Z"
  }
]

let checkedItems = []
let norm = []
let tagID = []

const normalizeCheckedItems = (data) =>{

  for (let i = 0; i < data[data.length-1].tag_id+1; i++) {
    norm.push({tag_id: i})
  }
  // console.log(norm)
  for (let i = 0; i < data.length; i++) {
    tagID.push(data[i].tag_id)
  }
  // console.log(tagID)
  for( var tag_id in norm){
    if(tagID.includes(Number(tag_id))===true){
      // console.log(norm[tag_id])
      norm[tag_id].checked = "true"
    }else{norm[tag_id].checked = "false"}
  }
  checkedItems = norm
  return checkedItems
}

// console.log(normalizeCheckedItems(data))
