type AppProps = {
    label : string,
    name : string,
    value : any,
    type: string,
    onChange : Function ,
}


const InputForm = ({label,name,value,type,onChange}:AppProps):JSX.Element => (
    <>
            <label
                className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                htmlFor="grid-password"
            >
              {label}
            </label>
            <input
                type={type}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                name = {name}
                onChange = {(e)=>onChange(e)}
                value = {value}
        /> 
    </>
)
export default InputForm;