import {formatDate} from '../../utils/Date'
type ModalProps={
    showModal:boolean,
    action:Function;
    settlement:any
}
 
  interface SettlementInfoProps{
    title:string;
    value:any
  }
 export const SettlementInfo=({title,value}:SettlementInfoProps)=>(
    <div>
        <label className="text-gray-400">{title}</label>
         <div>{value}</div>
    </div>
  )
  
  const Modal=({showModal,action,settlement}:ModalProps)=>(
    <>
    { showModal &&
     (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* <!--
          Background backdrop, show/hide based on modal state.
      
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            {/* <!--
              Modal panel, show/hide based on modal state.
      
              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            --> */}
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:min-w-sm w-2/3">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h4 className="underline pb-3 text-pink">Details on this Settlement</h4>
                <div className="grid grid-cols-4 gap-4">
                  <SettlementInfo title="Settlement Id" value={settlement?._id}/>
                  <SettlementInfo title="Amount" value={settlement?.amount}/>
                  <SettlementInfo title="Description" value={settlement?.description}/>
                  <SettlementInfo title="Account Type" value={settlement?.accountType}/>
                  <SettlementInfo title="Account Number" value={settlement?.accountNumber}/>
                  <SettlementInfo title="Account Name" value={settlement?.accountName}/>
                  <SettlementInfo title="Account Issuer" value={settlement?.accountIssuerName}/>
                  <SettlementInfo title="Start Date" value={formatDate(settlement?.startDate)}/>
                  <SettlementInfo title="End Date" value={formatDate(settlement?.endDate)}/>
                  <SettlementInfo title="Status" value='Declined'/>
                  <SettlementInfo title="Reason" value={settlement.discardReason}/>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" 
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={()=>action()}
                        >
                   Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
    </>  
  )
  export default Modal;
  