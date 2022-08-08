type ValueFilterProps={
    setFilter:React.SetStateAction<any>
    value:any;
    options:[...any]
}

const ValueFilterSelector=({setFilter,value,options}:ValueFilterProps)=>(
    <div className="relative">
        <select
           onChange = {(e:React.ChangeEvent<HTMLSelectElement>)=>setFilter(e.target.value)}
            value = {value}
            className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
              {
              options.map(op=><option value={op}>{op}</option>)
              }
        </select>
    </div>
)
export default ValueFilterSelector;