import {useEffect, useState, ChangeEvent} from 'react'
import AdminsTable from '../../tables/AdminsTable'
import authService from '../../../services/auth.service';
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import PageHeader from '../../header/PageHeader';
import {authSelector,setAdmins,setSelectedAdmin} from '../../../state/auth.state'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AllAdmins(){
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {admins}=useSelector(authSelector)
    
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    
    useEffect(()=>{
        response();
    },[searchQuery])

    const response = async()=> {
        try{ 
            setIsLoading(true)
            const res = await authService.getAllAdmins()
            if(!res.success){
               setIsLoading(false)
               return alert(res.message)
            }
            dispatch(setAdmins(res.data))
            setIsLoading(false)

        }catch(err:any){setIsLoading(false)}
    }

  const editAdmin = async(id:string) => {
   try{
    const admin=admins.filter(admin=>admin._id===id)
    console.log(admin)
    dispatch(setSelectedAdmin(admin[0]))
    navigate('/edit-admin')
   }catch(err){}
  }

const resetPassword=async(id:string)=>{
   try{
    const res=await authService.resetPassword(id)
    if(!res.success){
      return alert(res.message)
    }
     alert(res.message)
   }catch(err:any){
    alert(err?.message)
   }
}

const blockAdmin=async(id:string,isblocked:boolean)=>{
    try{
        const data={
            "id":id,
            "data": {
                "blocked": isblocked?false:true
            }
        }
        const res=await authService.update(data)
        if(!res.success)return alert(res.message)
        alert(res.message)
        //window.location.reload();
    }catch(err:any){alert(err.message)}
}

const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

 
const filterResults = admins?.filter((r:any)=>{
  const hasSearchResults:boolean = r?.accountName?.toLowerCase().includes(searchQuery)
  if((hasSearchResults))return r;
})

const results:any[] = filterResults.length === 0 ? admins : filterResults

//Get Current Rows
const indexofLastRow:number = currentIndex*rowsPerPage;
const indexofFirstRow:number = indexofLastRow - rowsPerPage; 
const currentRows = results.slice(indexofFirstRow,indexofLastRow)

 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

    return(
        <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}
          
           <PageHeader title="Administrators"/>        
       
       {/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                    <select
                        onChange = {pageRowsHandler}
                        value={rowsPerPage}
                        className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                        <option>80</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder=''/>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
            <div className="inline-block min-w-full shadow-lg overflow-hidden">
                <table className="overflow-x-scroll min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Email
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Account Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                Role
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-md'>
                       {
                           isLoading ?
                           <Spinner/>
                           :
                           <AdminsTable data={currentRows} resetPassword={resetPassword} blockAdmin={blockAdmin} editAdmin={editAdmin}/>
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col  items-center justify-center">
                    <div className="text-md md:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < admins.length ? (currentIndex * rowsPerPage): admins.length}</span> of <span>{admins.length}</span>{' '}users
                    </div> 
                    <div className="inline-flex mt-2 md:mt-0">
                        {
                            currentIndex === 1 ? 
                            (
                             <button className="text-sm bg-gray-100 text-gray-800 py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                             >
                            Prev
                        </button>
                            )
                            :
                            (<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l"
                                    onClick = {paginateBack}
                                >
                                    Prev
                            </button>)
                        } 
                         {
                            currentIndex * rowsPerPage === admins.length ? 
                            (
                                <button className="cursor-not-allowed text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
                                onClick = {paginateFront}
                                >
                                    Next
                                </button>
                            )
                            :
                            (
                            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
                            onClick = {paginateFront}
                            >
                                Next
                            </button>
                            )
                        }       
                    </div>
                </div>
            </div>
        </div>
     </div>
    )
}
export default AllAdmins;
