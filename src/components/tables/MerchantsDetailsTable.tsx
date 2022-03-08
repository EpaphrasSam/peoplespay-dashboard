import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { merchantsSelector, setDocuments } from "../../state/merchant.state";
import merchantsService from "../../services/merchant.service";
const QRCode = require("qrcode.react");

const swal = require("sweetalert2");

const MerchantDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { selected } = useSelector(merchantsSelector);

  const [title, setTitle] = React.useState("BASIC");

  const confirmMerchantApproval = async () => {
    try {
      const response = await merchantsService.approveMerchant({
        id: String(selected._id),
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

  React.useEffect(() => {
    try {
      getDocuments();
    } catch (err: any) {
      alert(err.message);
    }
  }, [selected]);

  const { docx } = useSelector(merchantsSelector);

  return (
    <>
      <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex justify-between relative w-full px-4 max-w-full flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Details
              </h3>
              <button
                className="font-sans bg-red-800 text-white font-bold uppercase text-xs px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
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
                }}
              >
                Approve Merchant
              </button>
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
                    ${title === 'BASIC' ? 'bg-red-800 text-white' : 'bg-gray-100'}
                    nav-link
                    w-full
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    px-6
                    ml-2
                    py-3
                    focus:outline-none focus:ring-0
                    cursor-pointer
                `}
              >
                BASIC
              </p>
            </li>
            <li
              className="nav-item flex-auto text-center my-2 md:mx-2"
              onClick={() => setTitle("CONTACT")}
            >
              <p
                className={`
                ${title === 'CONTACT' ? 'bg-red-800 text-white' : 'bg-gray-100'}
                nav-link
                w-full
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                px-6
                py-3
                focus:outline-none focus:ring-0
                cursor-pointer
            `}
              >
                CONTACT PERSONS
              </p>
            </li>
            <li
              className="nav-item flex-auto text-center my-2 md:ml-2"
              onClick={() => setTitle("BANK")}
            >
              <p
                className={`
                ${title === 'BANK' ? 'bg-red-800 text-white' : 'bg-gray-100'}
                nav-link
                w-full
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                px-6
                py-3
                focus:outline-none focus:ring-0
                cursor-pointer
            `}
              >
                BANK ACCOUNTS
              </p>
            </li>
            <li
              className="nav-item flex-auto text-center my-2 md:ml-2 md:mr-2"
              onClick={() => setTitle("DOCX")}
            >
              <p
                className={`
                ${title === 'DOCX' ? 'bg-red-800 text-white' : 'bg-gray-100'}
                nav-link
                w-full
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                px-6
                py-3
                focus:outline-none focus:ring-0
                cursor-pointer
            `}
              >
                DOCUMENTS
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
                    <td className="border border-slate-300 px-6 py-3 text-left">Bank Account Name</td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.bank_account_name}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Bank Account Issuer</td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.bank_account_issuer}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">Bank Account Number</td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.bank_account_number}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                        Momo Account Name
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.momo_account_name}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                        Momo Account Issuer
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.momo_account_issuer}
                    </td>
                    </tr>
                    <tr>
                    <td className="border border-slate-300 px-6 py-3 text-left">
                        Momo Account Number
                    </td>
                    <td className="border border-slate-300 px-6 py-3">
                        {selected?.momo_account_number}
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
                    {docx?.map(d=>
                        (
                            <tr>
                                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-left">{d.name}</td>
                                 <td className="border border-slate-300 px-6 py-4 whitespace-nowrap"><img src={d?.data} alt={d.name} className="w-22 h-20"/></td>
                            </tr>
                        
                    ))}
                    </tbody> 
                </table>      
              )
            
            }
            
          </div>
          {/* <div className="block w-full overflow-x-auto">
                
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                            <th className="border border-slate-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-left">Merchant ID</td>
                            <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">{selected?._id}</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-left">Type</td>
                            <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">{selected?.type}</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-left">Registration Number</td>
                            <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">{selected?.registrationNumber}</td>
                        </tr>
                    </tbody>
                </table>  
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                            <th className="border border-slate-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll" style={{height: '20vh'}}>
                    {docx?.map(d=>
                        (
                            <tr>
                                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-left">{d.name}</td>
                                 <td className="border border-slate-300 px-6 py-4 whitespace-nowrap"><img src={d?.data} alt={d.name} /></td>
                            </tr>
                        
                    ))}
                    </tbody> 
                </table>    
            </div> */}
        </div>
      </div>
    </>
  );
};

export default MerchantDetails;
