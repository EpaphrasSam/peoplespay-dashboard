 const TableHead=(titles:string[])=>(
      titles.map((head:string)=><th
           className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
           {head}
    </th>)
 )

export default TableHead;