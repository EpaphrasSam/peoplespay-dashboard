export type FormType={
    name:string,
    description:string
    onChange:any
}


const AddRoleForm= ({name,description,onChange}:FormType)=>(
     <div className="relative flex flex-col break-words w-full mb-6 rounded border bg-white">
         <div className="mb-0 px-6 py-6">
            <h6 className="text-xl font-bold">Basic Role Details</h6>
        </div>
        <div>
            <div className="w-full px-4">
                <div className="relative w-full mb-3">
                    <label
                     className="block text-gray-700 text-sm  mb-2 text-left"
                      >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
            </div>
            <div className="w-full px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block text-gray-700 text-sm mb-2 text-left">
                         Description
                    </label>
                    <textarea 
                      value={description}
                      name="description"
                      onChange={onChange}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                </div>
            </div>
        </div>           
    </div>
)
export default AddRoleForm;