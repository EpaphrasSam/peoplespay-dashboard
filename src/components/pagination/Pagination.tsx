import React from 'react';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';
import classnames from 'classnames'

type PaginationProps={
    onPageChange:any;
    totalCount:any;
    siblingCount?:any;
    currentPage:any;
    pageSize:any
    className:any
}
const Pagination=({onPageChange,totalCount,siblingCount=1,currentPage,pageSize,className}:PaginationProps)=>{

   const paginationRange:any=usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
   })

  if(currentPage===0||paginationRange?.length<2){
    return null;
  }

  const onNext=()=>{
    onPageChange(currentPage+1);
  }

  const onPrevious=()=>{
    onPageChange(currentPage-1)
  }

  let lastPage:number=paginationRange[paginationRange?.length-1];

  return(
    <>
    <ul className={classnames('pagination-container',{[className]:className})}>
        <li className={classnames('pagination-item',{disabled:currentPage===1})}
          onClick={onPrevious}
          >
            <span className="arrow left text-blue-500">Prev</span>
        </li>
        {paginationRange.map((pageNumber: string)=>{
            if(pageNumber===DOTS){
                return <li className='pagination-item dots'>&#8230;</li>
            }

            return(
                <li className={classnames('pagination-item',{selected:pageNumber===currentPage})} onClick={()=>onPageChange(pageNumber)}>
                    {pageNumber}
                </li>
            )
        })}
        
        <li className={classnames('pagination-item',{disabled:currentPage===lastPage})}
          onClick={onNext}
         >
            <span className="arrow right text-blue-500">Next</span>

        </li>
    </ul>
    </>
  )
}
export default Pagination;