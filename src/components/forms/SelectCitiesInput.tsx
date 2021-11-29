type AppProps = {
    label : string,
    name : string,
    value : any,
    onChange : Function ,
    onClick : Function,
}

const SelectFormInput =  ({label,name,value,onChange,onClick}:AppProps):JSX.Element => (
 <>
    <label
        className="block uppercase text-gray-700 text-xs font-semibold mb-2">
                    {label}
    </label>
    <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
     name={name}
     onChange = {()=>onChange}
     onClick = {()=>onClick}
     >
      <option value={value}>Option 2</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <i className='fas fa-angel-down h-4 w-4'/>
    </div>                                  
 </>   
)
export default SelectFormInput;