type ButtonProps={
    value:string|any;
    action:Function;
    color:string;
    icon?:any;
    borderVisible?:boolean
    paddingWide?:boolean
}

export const PrimaryButton=({value,action,color,icon}:ButtonProps)=>(
    <button
       className={`inline-flex items-center py-1.5 px-4 bg-${color}-500 text-white rounded hover:shadow outline focus:outline-none ease-linear transition-all duration-150 hover:bg-${color}-600 tracking-wide font-inter border border-${color}-400 space-x-2`}
       type="button"
       onClick={()=>action()}
        >
        {icon}
        <span>{value}</span>
    </button>
)

export const OutlinedButton=({value,action,color,icon,borderVisible,paddingWide}:ButtonProps)=>(
    <button
       className={`inline-flex items-center py-1.5 ${paddingWide?'px-4':'px-1'} bg-white text-${color}-400 rounded hover:shadow outline focus:outline-none ease-linear transition-all duration-150 hover:bg-${color}-100 tracking-wide font-inter ${borderVisible?'border-2':'border'} border-${color}-200 space-x-2`}
       type="button"
       onClick={()=>action()}
        >
        {icon}
        <span>{value}</span>
    </button>
)
