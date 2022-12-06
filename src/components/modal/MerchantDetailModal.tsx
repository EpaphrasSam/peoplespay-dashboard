import React, { useState } from 'react';
import { formatDate } from "../../utils/Date";

type ModalProps = {
  showModal: boolean;
  action: Function;
  merchant: any;
};

interface UserInfoProps {
  title: string;
  value: any;
  editable?: boolean;
  onChange?: () => void;
}
export const UserInfo = ({ title, value, editable = false, onChange }: UserInfoProps) => (
  <div>
    <label className="text-gray-700 break-all">{title}</label>
    {/* <div
      className={`break-all outline-none border-none ${
        editable ? "cursor-text" : "cursor-default"
      }`}
      contentEditable={editable}
      data-bs-toggle={editable && "tooltip"}
      data-bs-placement={editable && "top"}
      title={editable ? "This can be edited" : ""}
    >
      {value}
    </div> */}
    <textarea
      placeholder={value}
      readOnly={!editable}
      className={`border-none outline-none m-0 p-0 placeholder-gray-500 focus:ring-0 resize-none overflow-visible scrollbar-none ${
        editable ? "cursor-text" : "cursor-default"
      }`}
      title={editable ? "This can be edited" : ""}
      onChange={onChange}
    />
  </div>
);

const Modal = ({ showModal, action, merchant }: ModalProps) => (

  const [formData, setFormData] = useState({
    lineOfBusiness: '',
  })


    return (
    <>
        {showModal && (
          <div
            className="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
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
                    <h4 className="underline pb-3 text-pink">Basic Details</h4>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <UserInfo
                        title="Merchant Id"
                        value={merchant?.merchant?._id}
                      />
                      <UserInfo
                        title="Created At"
                        value={formatDate(merchant?.merchant?.createdAt)}

                      />
                      <UserInfo
                        title="Last Updated"
                        value={formatDate(merchant?.merchant?.updatedAt)}
                      />
                      <UserInfo
                        title="Merchant Name"
                        value={merchant?.merchant?.merchant_tradeName}
                      />
                      <UserInfo title="Email" value={merchant?.merchant?.email} />
                      <UserInfo
                        title="Address"
                        value={merchant?.merchant?.address}
                      />
                      <UserInfo
                        title="Location"
                        value={merchant?.merchant?.location}
                      />
                      <UserInfo
                        editable={true}
                        title="Line Of Business"
                        value={merchant?.merchant?.lineOfBusiness}
                        onChange={(e: any) => setFormData({ ...formData, lineOfBusiness: e.target.value })}
                      />
                      <UserInfo
                        title="Business Registration #"
                        value={merchant?.merchant?.registrationNumber}
                      />
                      <UserInfo
                        title="Status"
                        value={merchant?.merchant?.blocked ? "Blocked" : "Active"}
                      />
                    </div>
                    <h4 className="underline pb-3 text-pink">Contact Details</h4>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <UserInfo
                        editable={true}
                        title="Contact Person"
                        value={merchant?.merchant?.contact_person}
                      />
                      <UserInfo
                        editable={true}
                        title="Contact Person Phone"
                        value={merchant?.merchant?.contactPersonPhone}
                      />
                      <UserInfo
                        editable={true}
                        title="Contact Person Email"
                        value={merchant?.merchant?.contactPersonEmail}
                      />
                      <UserInfo
                        editable={true}
                        title="Contact Person Designation"
                        value={merchant?.merchant?.contactPersonDesignation}
                      />
                    </div>
                    <h4 className="underline pb-3 text-pink">Account Details</h4>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <UserInfo
                        editable={true}
                        title="Account Issuer"
                        value={merchant?.merchant?.account_issuer}
                      />
                      <UserInfo
                        title="Account Issuer Name"
                        value={merchant?.merchant?.account_issuer_name}
                      />
                      <UserInfo
                        editable={true}
                        title="Account Number"
                        value={merchant?.merchant?.account_number}
                      />
                      <UserInfo
                        editable={true}
                        title="Account Type"
                        value={merchant?.merchant?.account_type}
                      />
                      <UserInfo
                        editable={true}
                        title="Account Type"
                        value={merchant?.merchant?.type}
                      />
                    </div>
                    <h4 className="underline pb-3 text-pink">Wallet Details</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <UserInfo
                        title="Wallet Id"
                        value={merchant?.wallet?.walletId}
                      />
                      <UserInfo
                        title="Total Balance"
                        value={merchant?.wallet?.totalBalance.toFixed(2)}
                      />
                      <UserInfo
                        title="Last Balance"
                        value={merchant?.wallet?.lastBalance.toFixed(2)}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => action()}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>

    )
  );
export default Modal;
