import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { merchantsSelector, setDocuments,setBanks } from "../../state/merchant.state";
import merchantsService from "../../services/merchant.service";
import { OutlinedButton } from "../buttons/BasicButton";
import {FcCancel} from 'react-icons/fc';
import{IoMdCheckmarkCircle}from 'react-icons/io'
import BlockReasonModal from "../modal/BlockReasonModal";
import { alertResponse } from "../sweetalert/SweetAlert";

//const QRCode = require("qrcode.react");

const swal = require("sweetalert2");

const MerchantDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { selected } = useSelector(merchantsSelector);

  const [title, setTitle] = React.useState("BASIC");
  
  /**Decline Modal */
  const[showModal,setShowModal]=React.useState(false)
  const[reason,setReason]=React.useState('')

  const confirmMerchantApproval = async () => {
    try {
      const response = await merchantsService.approveMerchant({
        'id': selected._id
      });
      if (!response.success) {
        return swal.fire({
          text: response.message,
        });
      } else {
        return swal.fire({
          text: response.message,
        });
      }
    } catch (err: any) {
      swal.fire({
        text: err.message,
      });
    }
  };

  const confirmDeleteMerchant = async () => {
    try {
      const response = await merchantsService.deleteMerchant(selected['_id']);
      if(!response.success) {
        return swal.fire({
          text: response.message,
        });
      }else {
        return swal.fire({
          text: response.message,
        });
      }
    } catch (err: any) {
      swal.fire({
        text: err.message,
      });
    }
  }

  // const blockMerchant = async () => {
  //   try {
  //     const response = await merchantsService.blockMerchant({
  //       'id': selected._id,
  //       active : false
  //     });
  //     if (!response.success) {
  //       return swal.fire({
  //         text: response.message,
  //       });
  //     } else {
  //       return swal.fire({
  //         text: response.message,
  //       });
  //     }
  //   } catch (err: any) {
  //     swal.fire({
  //       text: err.message,
  //     });
  //   }
  // };

  

  const getDocuments = async () => {
    try{
      
      if (selected._id !== undefined) {
        const response = await merchantsService.getDocuments(selected._id);
        if (!response.success) {
          throw alert(response.message);
        }
        //console.log(response.data)
        const data = response.data.map((t: any) => t);
        dispatch(setDocuments(data));
      }
    }catch(err:any){
      console.log(err.message)
    }
  };

  // const getBankAccounts=async()=>{
  //   try{
  //     if (selected._id !== undefined) {
  //       const response = await merchantsService.getMerchantBank(selected._id)
  //       if (!response.success) {
  //         throw alert(response.message);
  //       }
  //       //console.log(response.data)
  //       const data = response.data.map((t: any) => t);
  //       dispatch(setBanks(data));
  //     }
  //   }catch(err){}
  // }

  const approve=()=>{
    try {
       if (selected._id === undefined) {
        swal.fire({
          text: "No merchant selected",
        });
      } else {
        swal
          .fire({
            text: " Confirm merchant approval",
            showDenyButton: true,
            denyButtonText: "Cancel Approval",
            confirmButtonText: "Confirm Approval",
          })
          .then((result: any) => {
            if (result.isConfirmed) {
              confirmMerchantApproval();
            }
          });
      }
      return;
    } catch (err: any) {
      alert(err.message);
    }
  }

  const deleteMerchant = () => {
    try {
      if (selected._id === undefined) {
        swal.fire({
          text: "No merchant selected",
        });
      }else {
        swal
          .fire({
            text: " Confirm merchant deletion",
            showDenyButton: true,
            denyButtonText: "Cancel Deletion",
            confirmButtonText: "Confirm Deletion",
          })
          .then((result: any) => {
            if (result.isConfirmed) {
              confirmDeleteMerchant();
            }
          });
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  const declineMerchant=async():Promise<any>=>{
    try{
      if(reason==="" ||reason=== null)return alert('Please provide a reason')
      const data={
        id:selected?._id,
        declineReason:reason
      }
      const res=await merchantsService.declineMerchant(data)
      await alertResponse({
       icon:res.success?'success':'error',
       response:res.success?res.message:'Sorry, please check your internet and try again'
      })
      if(res.success)return setShowModal(false)
    }catch(err){}
  }

  React.useEffect(() => {
    try {
      getDocuments()
      // getBankAccounts()
    } catch (err: any) {
      alert(err.message);
    }
  }, [selected]);

  const { docx } = useSelector(merchantsSelector);

  return (
    <>
     <BlockReasonModal 
          showModal={showModal} 
          action={()=>declineMerchant()} 
          type="Decline" reason={reason} 
          onChange={(e:any)=>setReason(e.target.value)}
          cancel={()=>setShowModal(false)}
          />
      <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex justify-between relative w-full px-4 max-w-full flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Details
              </h3>
              <div className="space-x-2">
                {
                  selected.submitted && 
                  <button
                    className={`inline-flex items-center space-x-3 ${selected?.active?'opacity-75':''} bg-blue-500 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150`}
                    type="button"
                    disabled={selected?.active}
                    onClick={() =>{approve()}}
                  >
                    <IoMdCheckmarkCircle/>
                    {selected?.active ? 'Approved' : 'Approve Merchant'}
                  </button>
                }
                {!selected.active && selected.submitted &&<OutlinedButton
                   action={()=>{
                    if(selected._id===undefined){return alert('No merchant selected')}
                    else if(!selected?.submitted && !selected?.decline){return alert('Merchant has not submitted business details')}
                    else if(selected?.decline)return alert('This merchant has been declined')
                    setShowModal(true)}
                  }
                   value="Decline"
                   color="red"
                   borderVisible
                   paddingWide
                   icon={<FcCancel/>}
                 />}
                 {
                  !selected?.submitted && <OutlinedButton
                    action = {() => deleteMerchant()}
                    value="Delete"
                    color="red"
                    borderVisible
                    paddingWide
                    icon={<FcCancel/>}
                  />
                 }
              </div>
              
            </div>
          </div>
          <hr />
          <ul className="nav nav-pills flex flex-col md:flex-row list-none pl-0 mb-4">
            <li
              className="nav-item flex-auto text-center my-2 md:mr-2"
              onClick={() => setTitle("BASIC")}
            >
              <p
                className={`
                    ${title === 'BASIC' ? 'bg-blue-500 text-white' : 'bg-gray-100'}
                    nav-link
                    w-full
                    block
                    font-medium
                    text-sm
                    leading-tight
                    rounded
                    px-6
                    ml-2
                    py-3
                    focus:outline-none focus:ring-0
                    cursor-pointer
                `}
              >
                Basic
              </p>
            </li>
            <li
              className="nav-item flex-auto text-center my-2 md:mx-2"
              onClick={() => setTitle("CONTACT")}
            >
              <p
                className={`
                ${title === 'CONTACT' ? 'bg-blue-500 text-white' : 'bg-gray-100'}
                nav-link
                w-full
                block
                font-medium
                text-sm
                leading-tight
                rounded
                px-6
                py-3
                focus:outline-none focus:ring-0
                cursor-pointer
            `}
              >
                Contacts
              </p>
            </li>
            <li
              className="nav-item flex-auto text-center my-2 md:ml-2"
              onClick={() => setTitle("BANK")}
            >
              <p
                className={`
                ${title === 'BANK' ? 'bg-blue-500 text-white' : 'bg-gray-100'}
                nav-link
                w-full
                block
                font-medium
                text-sm
                leading-tight
                rounded
                px-6
                py-3
                focus:outline-none focus:ring-0
                cursor-pointer
            `}
              >
                Accounts
              </p>
            </li>
            <li
              className="nav-item flex-auto text-center my-2 md:ml-2 md:mr-2"
              onClick={() => setTitle("DOCX")}
            >
              <p
                className={`
                ${title === 'DOCX' ? 'bg-blue-500 text-white' : 'bg-gray-100'}
                nav-link
                w-full
                block
                font-medium
                text-sm
                leading-tight
                rounded
                px-6
                py-3
                focus:outline-none focus:ring-0
                cursor-pointer
            `}
              >
                Documents
              </p>
            </li>
          </ul>
          <div className=" overflow-x-auto">
              { 
                title === 'BASIC' ? 
              
              (
                <table className="w-full border-separate border border-slate-400 ">
                <thead>
                  <tr>
                    <th className="border border-slate-300 px-6 py-3">Field</th>
                    <th className="border border-slate-300 px-6 py-3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Merchant ID</td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?._id}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Merchant Trade Name</td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?.merchant_tradeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Email</td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Registration Number
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                    {selected?.registrationNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Line of Business
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                    {selected?.lineOfBusiness}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Location
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                    {selected?.location}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Phone
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Tier Choice
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?.tier_choice?.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Monthly Limit
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?.tier_choice?.monthly_limit}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                      Documents Limited
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                      {selected?.tier_choice?.documents}
                    </td>
                  </tr>
                </tbody>
              </table>

              ) :
              title === 'CONTACT' ?

              (
                <table className="w-full border-separate border border-slate-400 ">
                    <thead>
                        <tr>
                        <th className="border border-slate-300 px-6 py-3">Field</th>
                        <th className="border border-slate-300 px-6 py-3">Value</th>
                        </tr>
                    </thead>
                <tbody>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Contact Person</td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.contact_person}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Contact Person Email</td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.contactPersonEmail}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Contact Person Phone</td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.contactPersonPhone}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                        Contact Person Designation
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                    {selected?.contactPersonDesignation}
                    </td>
                    </tr>
              </tbody>
            </table>
              ) :

              title === 'BANK' ? 

              (
                <table className="w-full border-separate border border-slate-400 ">
                    <thead>
                        <tr>
                        <th className="border border-slate-300 px-6 py-3">Field</th>
                        <th className="border border-slate-300 px-6 py-3">Value</th>
                        </tr>
                    </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-6 py-3 text-left">Account Provider</td>
                      <td className="border border-slate-300 px-6 py-3">
                          {selected?.account_issuer_name}
                      </td>
                    </tr> 
                    <tr>
                      <td className="border border-slate-300 px-6 py-3 text-left">Account Name</td>
                      <td className="border border-slate-300 px-6 py-3">
                          {selected?.account_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-6 py-3 text-left">Account Number</td>
                      <td className="border border-slate-300 px-6 py-3">
                          {selected?.account_number}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) :

              (
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                            <th className="border border-slate-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll" style={{height: '20vh'}}>
                    {docx?.map((d: any, i: number)=>
                        (
                            <tr key={i}>
                                <td className="border border-slate-300 px-6 py-4 text-left">{d.name}</td>
                                  <td className="border border-slate-300 px-6 py-4 whitespace-nowrap flex justify-center">
                                    <a href={d?.data} download className="bg-red-800 text-white font-bold uppercase text-xs px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
                                      Download
                                    </a>
                                  </td>
                                 {/* <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-left">
                                   <button className="bg-red-800 text-white font-bold uppercase text-xs px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                    onClick={()=>{
                                      let w = window.open('about:blank');
                                      let image = new Image();
                                      image.src = d?.data;
                                      setTimeout(function(){
                                        w?.document.write(image.outerHTML);
                                      }, 0);
                                    }}>
                                    view
                                  </button>
                                  
                                </td> */}
                            </tr>
                        
                    ))}
                    </tbody> 
                </table>      
              )
            
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantDetails;
