type ButtonProps={
    value:string;
    action:Function;
    color:string
}

const PrimaryButton=({value,action,color}:ButtonProps)=>(
    <button
       className={`py-3 px-2 bg-${color}-500 text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-${color}-800 tracking-wide font-segoe`}
       type="button"
       onClick={()=>action()}
        >
        {value}
    </button>
)
export default PrimaryButton;