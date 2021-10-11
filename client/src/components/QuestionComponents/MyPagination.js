import React from "react";
import { Pagination } from "react-bootstrap";

const MyPagination = ({page, totalPages, tag, getData, sortBy}) =>{
  return (
    <div>
      <Pagination>
        {page > 1 && <Pagination.First onClick={(e)=>getData(sortBy, 1, tag)}/>}
        {page > 1 && <Pagination.Prev onClick={(e)=>getData(sortBy, page -1, tag)}/>}
        {page > 1 && <Pagination.Item onClick={(e)=>getData(sortBy, page -1, tag)}>{page-1}</Pagination.Item>}
        <Pagination.Item active>{page}</Pagination.Item>
        {page < totalPages && <Pagination.Item onClick={(e)=>getData(sortBy, page +1, tag)}>{page+1}</Pagination.Item>}
        {page < totalPages && <Pagination.Next onClick={(e)=>getData(sortBy, page +1, tag)}/>}
        {page < totalPages && <Pagination.Last onClick={(e)=>getData(sortBy, totalPages, tag)}/>}
      </Pagination>
    </div>
  )
}

export default MyPagination;