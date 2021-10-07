import React from "react";
import { Pagination } from "react-bootstrap";

const QuestionPagination = ({page, totalPages, setPage}) =>{

  return (
    <div>
      <Pagination>
          {page > 1 &&<Pagination.First onClick={()=>setPage(1)}/>}
          {page > 1 && <Pagination.Prev onClick={()=>setPage(page-1)}/>}
          {page > 1 && <Pagination.Item onClick={()=>setPage(page-1)}>{page-1}</Pagination.Item>}
          <Pagination.Item active>{page}</Pagination.Item>
          {page < totalPages && <Pagination.Item onClick={()=>setPage(page+1)}>{page+1}</Pagination.Item>}
          {page < totalPages && <Pagination.Next onClick={()=>setPage(page+1)}/>}
          {page < totalPages && <Pagination.Last onClick={()=>setPage(totalPages)}/>}
        </Pagination>
    </div>
  )
}

export default QuestionPagination;