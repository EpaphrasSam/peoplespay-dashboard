import React,{useState,useEffect, ChangeEvent,useMemo} from "react";
import merchantService from "../../services/merchant.service";
import InputForm from "./Input";
import SelectCitiesFormInput from "./SelectCitiesInput";

export default function CreateMerchantForm() {
    
    const getActivities = async () => {
       const res =  await merchantService.getActivities();
       if(!res.success){
           throw Error('count not load activities')
       }
       let options = res.map((ac:any) => ac?.name)
        
    }

    const getCities = async () => {
        const res =  await merchantService.getCities();
        if(!res.success){
            throw Error('count not load activities')
        }
        let options = res.map((c:any) => c?.name)
         
     }
    

 
    const [formData, setFormData] = useState({
        title : '',
        first_name: '',
        last_name : '',
        gender : '',
        email : '',
        phone : '',
        name : '',
        merchant_tradename : '',
        registration_number : '',
        region_name : '',
        city_name : '',
        postal : '',
        vat_number : '',
        acceptor_pointname : '',
        acceptor_pointlocation : '',
        category : '',
        activity: '',
        contact_person :''     
     })
 
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const {title,
           first_name,
           last_name,
           gender,
           email,
           phone,
           name,
           merchant_tradename,
           registration_number,
           region_name,
           city_name,
           postal,
           vat_number,
           acceptor_pointname,
           acceptor_pointlocation,
           category,
           activity,
           contact_person
        } = formData
    
    return (
        <div className='relative md:pt-28 pb-10 p-2'>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Merchant Form</h6>
                        <button
                            className="bg-red-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            New Merchant
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-gray-500 text-sm mt-2 mb-6 font-bold uppercase">
                            Merchant Details
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='title' type='text' value={title} name='title' onChange={onChange} /> 
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='first name' type='text' value={first_name} name='firt_name' onChange={onChange} />  
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='last name' type='text' value={last_name} name='last_name' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='gender' type='text' value={gender} name='gender' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='email' type='email' value={email} name='email' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='Phone Number' type='text' value={phone} name='phone' onChange={onChange} />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Company Details
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='company name' type='text' value={name} name='name' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='merchant trade name' type='text' value={merchant_tradename} name='merchant_tradename' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='business registration number' type='text' value={registration_number} name='registration_number' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <SelectCitiesFormInput 
                                   label='select region' 
                                   name='select_region' 
                                   value={region_name}
                                   onChange={onChange}/>
                                   onClick={}
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <SelectFormInput label='select city' name='select_city' value={city_name} onChange={onChange}/>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='Postal address' type='text' value={postal} name='postal' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                 <InputForm label='vat number' type='text' value={vat_number} name='vat_number' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='Acceptor point name' type='text' value={acceptor_pointname} name='acceptor_pointname' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='Acceptor point location   ' type='text' value={title} name='title' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='Merchant category' type='text' value={category} name='category' onChange={onChange} />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <SelectFormInput label='Merchant activity' name='select_city' value={city_name} onChange={onChange}/>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                <InputForm label='Contact Person Name' type='text' value={contact_person} name='contact_person' onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        <button className='uppercase font-bold text-sm float-right mt-5 bg-red-700 leading-tight text-white py-3 px-6 rounded-t hover:bg-white hover:ring-2 hover:ring-red-800  hover:text-red-800'>
                            Verify Merchant
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}