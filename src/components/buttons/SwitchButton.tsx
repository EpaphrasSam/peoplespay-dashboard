type SwitchProps={
  value:string;
  action:Function;
  status:any
}
const SwitchButton=({value,action,status}:SwitchProps)=>(
<label 
    className="flex items-center cursor-pointer"
    onClick={()=>action()}
  >
    <div className="relative">
    
      <input id="toogleA" type="checkbox" className="sr-only"/>
    
      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
    
      <div className={`${status?'bg-sgreen transform-x-full -right-1':'-left-1'} absolute w-6 h-6 bg-white rounded-full shadow -top-1 transition`}></div>
    </div>

    <div className="ml-3 text-gray-700 font-medium">
      {value}
    </div>
  </label>
)
export default SwitchButton;

