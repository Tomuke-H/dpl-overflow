
data = [
  {
      "id": 5,
      "tag_id": 2,
      "question_id": 15,
      "created_at": "2021-10-08T21:54:31.315Z",
      "updated_at": "2021-10-08T21:54:31.315Z"
  },
  {
      "id": 6,
      "tag_id": 12,
      "question_id": 15,
      "created_at": "2021-10-08T21:54:31.704Z",
      "updated_at": "2021-10-08T21:54:31.704Z"
  },
  {
      "id": 7,
      "tag_id": 13,
      "question_id": 15,
      "created_at": "2021-10-08T21:54:31.753Z",
      "updated_at": "2021-10-08T21:54:31.753Z"
  }
]


const normalizeCheckedItems = (data) =>{
  for (let i = 0; i < data[data.length-1].tag_id; i++) {
    console.log("in First Loop")
    for (let j = 0; j < data.length; j++) {
      console.log("Data at J",data[j])
      console.log("data J tag Id",data[j].tag_id)
      console.log("data i",data[i])
      if(data[j].tag_id === data[i]){
        console.log("hi")
      }      
    }
  }
}

console.log(normalizeCheckedItems(data))