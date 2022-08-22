 type CheckboxParams={
    value:string,
    name:string
    click:Function
    isChecked:boolean
    id?:string
 }
 const Checkbox=({name,value,click,isChecked,id}:CheckboxParams)=>(
    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-200 checked:border-blue-200 focus:outline-none transition duration-900 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
    type="checkbox" 
    value={value}
    name={name}
    onChange={(e)=>click(e)}
    checked={isChecked}
    id={id}
    />
)
export default Checkbox;