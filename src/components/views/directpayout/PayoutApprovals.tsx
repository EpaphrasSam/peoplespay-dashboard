import {useEffect, useState, ChangeEvent} from 'react'
import PendingPayoutsTable from '../../tables/PendingPayouts'
import {useDispatch, useSelector} from 'react-redux';
import {accountsSelector,setPendingPayouts} from '../../../state/account.state' 
import AccountsService from '../../../services/accounts.service';
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
import RowNumberSelector from '../../buttons/RowNumberSelector';
import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import { OutlinedButton } from '../../buttons/BasicButton';
import { BiFilterAlt } from 'react-icons/bi';
import PageHeader from '../../header/PageHeader';
import { alertResponse, confirmAlert, OTPAlertInput } from '../../sweetalert/SweetAlert';
import PayoutModal from '../../modal/PayoutModal'
import BlockReasonModal from "../../modal/BlockReasonModal";

function PayoutApproval(){
    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('')
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [transactionCategory, setTransactionCategory] = useState<string>('')
    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    
    const[showModal,setShowModal]=useState(false);
    const [transaction,setTransaction]=useState<any>();
    const [showReasonModal,setShowReasonModal]=useState(false)
    const [reason,setReason]=useState('')


    useEffect(()=>{
        response();
    },[]) 

    const response = async()=> {
        try{ 
            
            const res = await AccountsService.getPendingPayouts() 
            if(!res.success){
            
               return  alert(res.message)     
            }
            dispatch(setPendingPayouts(res.data))
        

            //Update states
        }catch(err:any){}
    }

    const approve = () => {
        try{
            confirmAlert({
                text:'This will approve this payout',
                confirmButtonText:'Yes, approve'
            }).then(async(result)=>{
                if(result.isConfirmed){
                    OTPAlertInput().then(async(result:any)=>{
                        if(!result.isDenied){
                           const res = await AccountsService.approvePayout({
                            id:transaction._id,
                            otp:result.value
                           }) 
                           await alertResponse({
                            icon:res.success?'success':'error',
                            response:res.message
                           })
                           if(res.success) return window.location.reload();
                        }
                    })
                                   
                }
            })
            }
            catch(err:any){
            alertResponse({
                icon:'info',
                response:err.message
            })
        }
    }

    const decline = () => {
        try{
        if(reason===null||reason===""){
            throw new Error('Please provide a reason for declining')
        }
        confirmAlert({
            text:'This payout will be discarded',
            confirmButtonText:'Yes, decline'
        }).then(async(result)=>{
            if(result.isConfirmed){
                const res = await AccountsService.declinePayout({
                    id: transaction._id,
                    reason,
                })
                await alertResponse({
                    icon:res.success?'success':'error',
                    response:res.message
                })
                if(res.success) return window.location.reload();
            }
        })
        }
        catch(err:any){
            alertResponse({
            icon:'info',
            response:err.message
            })
        }
    }
     
    const {pendingPayouts} = useSelector(accountsSelector)

    const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
        setRowsPerPage(parseInt(e.target.value))
    }

 const transactionCategoryHandler   = (e:ChangeEvent<HTMLSelectElement>) => setTransactionCategory(e.target.value);
 
 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

    return(
        <div className="font-segoe relative md:pt-7 pb-10 p-2 w-full mb-12 px-4">
            <PayoutModal showModal={showModal} transaction={transaction} approve={approve} decline={()=>setShowReasonModal(true)} cancel={()=>setShowModal(false)}/>
            <BlockReasonModal showModal={showReasonModal} action={decline} type={'Decline'} reason={reason} onChange={(e:any)=>setReason(e.target.value)} cancel={()=>setShowReasonModal(false)} />
            {/**page heading */}
           <PageHeader title="Pending Payout Approvals"/>    
        {/**date picker */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="date"
                className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500'
                placeholder='End date'
                onChange={(date:any)=>setStartDate(date.target.value)}
                value={startDate}/>   
          </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
            <input type="date" 
                className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500'
                placeholder='End date'
                onChange={(date:any)=>setEndDate(date.target.value)}
                value={endDate}/>   
       </div>
       {/**filter btn */}
       <OutlinedButton 
        value={'Filter'}
        action={()=>{}}
        color="gray"
        paddingWide
        icon={<BiFilterAlt/>}
       />
     </div>
     {/**end date */}
{/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
                <ValueFilterSelector setFilter={transactionCategoryHandler} value={transactionCategory} options={['name']}/>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder='Search merchant name ...'/>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="overflow-x-scroll min-w-full leading-normal">
                    <thead className="text-sm">
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                Date Initiated
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Description
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Initiator
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lef tracking-wider">
                                Recipient Account Number
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Recipient Account Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Recipient Account Issuer
                            </th>
                             <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                      
                     <PendingPayoutsTable data={pendingPayouts} setTransaction={setTransaction} setShowModal={setShowModal}/>
                       
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col items-center md:justify-center">
                    <div className="text-md md:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < pendingPayouts.length ? (currentIndex * rowsPerPage): pendingPayouts.length}</span> of <span>{pendingPayouts.length}</span>{' '}Settlements
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
                            currentIndex * rowsPerPage === pendingPayouts.length ? 
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
export default PayoutApproval;
