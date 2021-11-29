import React from 'react';

const Pagination = (rowsPerPage : any,
                    totalRows : any,
                    paginateFront:any,
                    paginateBack: any,
                    currentRows: any
                    ) => {
return(
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
         <span className="text-xs xs:text-sm text-gray-900">
             Showing <span>{currentRows * rowsPerPage - 10}{''}</span> to{''}<span>{currentRows * rowsPerPage}</span> of <span>{totalRows}</span>{''}Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
             onClick = {paginateBack}
            >
                Prev
             </button>
            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
            onClick = {paginateFront}
            >
                Next
            </button>
        </div>
    </div>
)
}
export default Pagination;