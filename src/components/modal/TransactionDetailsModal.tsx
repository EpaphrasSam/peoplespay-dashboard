type ModalProps={
    showModal:boolean,
    action:Function;
    transaction:any
  }
 
  interface UserInfoProps{
    title:string;
    value:any
  }
 export const TransactionInfo=({title,value}:UserInfoProps)=>(
    <div>
        <label className="text-gray-400">{title}</label>
         <div>{value}</div>
    </div>
  )
  
  const Modal=({showModal,action,transaction}:ModalProps)=>(
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
                <h4 className="underline pb-3 text-pink">Transaction Details</h4>
                <div className="grid grid-cols-4 gap-4">
                  <TransactionInfo title="Transaction Id" value={transaction?._id}/>
                  <TransactionInfo title="Reference Number" value={transaction?.reference}/>
                  <TransactionInfo title="Transaction Date" value={transaction?.createdAt}/>
                  <TransactionInfo title="Transaction Time" value={transaction?.time}/>
                  <TransactionInfo title="Transaction Type" value={transaction?.transaction_type}/>
                  <TransactionInfo title="Customer Name" value={transaction?.customerName}/>
                  <TransactionInfo title="Customer Phone" value={transaction?.customerPhone}/>
                  <TransactionInfo title="Payment Account Number" value={transaction?.paymentNumber}/>
                  <TransactionInfo title="Payment Account Name" value={transaction?.paymentName} />
                  <TransactionInfo title="Amount With Charges" value={transaction?.amount} />
                  <TransactionInfo title="Charge" value={transaction?.charges} />
                  <TransactionInfo title="Amount Without Charges" value={transaction?.actualAmount} />
                  <TransactionInfo title="Recipient Name" value={transaction?.recipientName} />
                  <TransactionInfo title="Recipient Number" value={transaction?.recipientNumber} />
                  <TransactionInfo title="Recipient Issuer" value={transaction?.recipientIssuer} />
                  <TransactionInfo title="Transaction Status" value={transaction?.status} />
                  <TransactionInfo title="Payment Issuer" value={transaction?.paymentIssuer} />
                  <TransactionInfo title="Reason" value={transaction?.getReason()||null} />
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
  
  
  // swal(
  //   <div>
  //       <h2 className='text-red-800 font-semibold text-xl'>Transaction Details</h2>
  //           <hr className="my-4 md:min-w-full mb-5" />
  //           <div className='grid grid-cols-2 gap-4 text-left'>
  //           <div className='mb-2 ml-1'>
  //               <h3 className='text-red-800'>transaction ID</h3>
  //                   <h5>{t._id}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Customer Reference</h3>
  //                   <h5>{t.reference}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>transaction date</h3>
  //                   <h5>{t.createdAt}</h5>
  //                   {t.time}
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>transaction type</h3>
  //                   <h5>{t.transaction_type}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Customer Name</h3>
  //                   <h5>{t.customerName}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Customer Phone</h3>
  //                   <h5>{t.customerPhone}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Payment Account Number</h3>
  //                   <h5>{t.paymentNumber}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Payment Account Name</h3>
  //                   <h5>{t.paymentName}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Total Amount</h3>
  //                   <h5>{t.amount}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Charge</h3>
  //                   <h5>{t.charges}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Amount</h3>
  //                   <h5>{t.actualAmount}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Recipient Name</h3>
  //                   <h5>{t.recipientName}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Recipient Number</h3>
  //                   <h5>{t.recipientNumber}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Recipient Issuer</h3>
  //                   <h5>{t.recipientIssuer}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Status</h3>
  //                   <h5>{t.status}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Payment Issuer</h3>
  //                   <h5>{t?.paymentIssuer}</h5>
  //           </div>
  //           <div className='mb-2'>
  //               <h3 className='text-red-800'>Reason</h3>
  //                   <h5>{t.getReason() || ''}</h5>
  //           </div>
  //           </div> 
  //       </div>
  //      )
  
  
  
  
  
  
  

