import React from "react";
import { Pagination } from "react-bootstrap";

const QuestionPagination = ({page, totalPages, tag, getQuestions, sortBy}) =>{
  return (
    <div>
      {/* <Pagination>
          {page > 1 && <Pagination.First onClick={()=>loadPage(1)}/>}
          {page > 1 && <Pagination.Prev onClick={()=>loadPage(page-1)}/>}
          {page > 1 && <Pagination.Item onClick={()=>loadPage(page-1)}>{page-1}</Pagination.Item>}
          <Pagination.Item active>{page}</Pagination.Item>
          {page < totalPages && <Pagination.Item onClick={()=>loadPage(page+1)}>{page+1}</Pagination.Item>}
          {page < totalPages && <Pagination.Next onClick={()=>loadPage(page+1)}/>}
          {page < totalPages && <Pagination.Last onClick={()=>loadPage(totalPages)}/>}
        </Pagination> */}
      <Pagination>
        <Pagination.First/>
        <Pagination.Prev onClick={(e)=>getQuestions(sortBy, page -1, tag)}/>
        <Pagination.Item onClick={(e)=>getQuestions(sortBy, page -1, tag)}>{page-1}</Pagination.Item>
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item onClick={(e)=>getQuestions(sortBy, page +1, tag)}>{page+1}</Pagination.Item>
        <Pagination.Next onClick={(e)=>getQuestions(sortBy, page +1, tag)}/>
        <Pagination.Last/>
      </Pagination>
    </div>
  )
}

export default QuestionPagination;