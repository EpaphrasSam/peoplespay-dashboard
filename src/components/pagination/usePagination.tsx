import {useMemo} from 'react'

export const DOTS='...';

const range = (start:number,end:number)=>{
  let length=end-start+1
  return Array.from({length},(_,idx)=>idx+start);
}

type PaginationProp={
    totalCount:any,
    pageSize:any,
    siblingCount:number,
    currentPage:any
}

export const usePagination=({totalCount,pageSize,siblingCount=1,currentPage}:PaginationProp)=>{
 
const paginationRange=useMemo(()=>{
    const totalPageCount=Math.ceil(totalCount/pageSize)
    
    //Pages Count determined as siblingCount+firstPage+lastPage+currentPage+2*DOTS
    const totalPageNumbers =siblingCount+5;

    /**Pages Less than intended page numbers, return range [1...totalPageCount] */
    if(totalPageNumbers>=totalPageCount){
        return range(1,totalPageCount);
    }

    const leftSiblingIndex=Math.max(currentPage-siblingCount,1)
    const rightSiblingIndex=Math.min(currentPage+siblingCount,totalPageCount)

    /**Dont show dots for only one position left after/before*/
    const shouldShowLeftDots:boolean=leftSiblingIndex>2;
    const shouldShowRightDots:boolean=rightSiblingIndex<totalPageCount-2;

    const firstPageIndex=1;
    const lastPageIndex=totalPageCount;

    if(!shouldShowLeftDots&&shouldShowRightDots){
        let leftItemCount=3 + 2*siblingCount
        let leftRange=range(1,leftItemCount);

        return [...leftRange,DOTS,totalPageCount];
    }

    if(shouldShowLeftDots&&!shouldShowRightDots){
        let rightItemCount=3 + 2*siblingCount;
        let rightRange=range(totalPageCount-rightItemCount+1,totalPageCount)

        return [firstPageIndex,DOTS,...rightRange]
    }

    if(shouldShowLeftDots&&shouldShowRightDots){
        let middleRange=range(leftSiblingIndex,rightSiblingIndex);
        return [firstPageIndex,DOTS,...middleRange,DOTS,lastPageIndex]
    }
},[totalCount,pageSize,siblingCount,currentPage])
 

 return paginationRange;
}

