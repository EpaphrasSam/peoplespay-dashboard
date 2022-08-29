import { OutlinedButton, PrimaryButton } from "../buttons/BasicButton";


interface Props{
    name:string,
    description:string
    access:any[]
    onSubmit:Function,
    onClear:Function,
    loading:boolean
}

const RoleStateForm= ({name,description,access,onSubmit,onClear,loading}:Props)=>(
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-white border">
            <div className="mx-4 mt-6 mb-4">
                <div className="float-right space-x-2">
                        <PrimaryButton
                            action={onSubmit}
                            color="blue"
                            value={loading?'Adding role...':'Submit'}
                        />
                       <OutlinedButton 
                            value='Clear All Permissions' 
                            action={onClear} 
                            color="blue"
                            borderVisible
                            paddingWide
                        />
                </div>
                <h6 className="text-center text-xl font-bold">Role Profile</h6>
            </div>
            <div className="px-4 lg:px-10 py-10 pt-0">
                <div className="relative w-full mb-3 space-x-4 flex items-center">
                    <label
                       className="mb-2"
                     >
                      <span>Role Name :</span>
                      <span className="text-gray-700 font-semibold">{name}</span>
                    </label>
                    
                </div>
                <div className="relative w-full mb-3 space-x-4 flex items-center">
                    <label
                       className="mb-2"
                     >
                      <span>Role Description : </span>
                      <span className="text-gray-700 font-semibold">{description}</span>
                    </label>
                </div>
                <div className="relative w-full space-x-4 flex">
                    <label
                     >
                      <span>Access and Permissions : </span>
                    </label>
                    <span className="text-gray-700 text-left">
                        {access?.map((a,i)=>(
                        <div>
                            <span className="mr-4" key={i}>{a?.title}</span>
                            {a?.permissions?.map((p:any)=>(
                                 <span className="text-blue-500 font-thin italic font-segoe">{p},</span> 
                            ))}
                        </div>
                        ))}        
                    </span>
                </div> 
             </div>            
    </div>
)
export default RoleStateForm;