type ButtonProps={
    value:string;
    action:Function;
}

const BasicButton=({value,action}:ButtonProps)=>(
    <button
       className={`bg-red-800 text-white font-bold uppercase text-xs px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150`}
       type="button"
       onClick={()=>action}
        >
        {value}
    </button>
)
export default BasicButton;