import React, { FC, useState } from "react";
import merchantsService from "../../services/merchant.service";
import { formatDate } from "../../utils/Date";
import { alertResponse, confirmAlert } from "../sweetalert/SweetAlert";
import TextareaAutosize from "react-textarea-autosize";

type ModalProps = {
  showModal: boolean;
  action: Function;
  merchant: any;
};

interface UserInfoProps {
  title: string;
  value: any;
  editable?: boolean;
  onChange?: any;
}

export const UserInfo = ({
  title,
  value,
  editable = false,
  onChange,
}: UserInfoProps) => (
  <div className="flex flex-col">
    <label className="text-gray-700 break-all">{title}</label>
    <TextareaAutosize
      id="textarea"
      rows={1}
      placeholder={value}
      readOnly={!editable}
      className={`${
        editable ? "cursor-text" : "cursor-default bg-gray-300"
      } py-0 px-2 placeholder-gray-500 focus:ring-0 rounded resize-none 
       scrollbar-none `}
      onChange={onChange}
    />
  </div>
);

const MerchantModal: FC<ModalProps> = ({ showModal, action, merchant }) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lineOfBusiness: "",
    contact_person: "",
    contactPersonDesignation: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    account_issuer: "",
    account_issuer_name: "",
    account_name: "",
    account_number: "",
    account_type: "",
  });

  const toggleEdit = () => {
    if (!edit) {
      setEdit(true);
      return;
    }
    setEdit(false);
  };

  const validate = async () => {
    let data: any = {};
    if (formData.account_issuer === "") {
      data.account_issuer = merchant?.merchant?.account_issuer;
    } else {
      data.account_issuer = formData.account_issuer;
    }
    if (formData.account_issuer_name === "") {
      data.account_issuer_name = merchant?.merchant?.account_issuer_name;
    } else {
      data.account_issuer_name = formData.account_issuer_name;
    }
    if (formData.account_name === "") {
      data.account_name = merchant?.merchant?.account_name;
    } else {
      data.account_name = formData.account_name;
    }
    if (formData.account_number === "") {
      data.account_number = merchant?.merchant?.account_number;
    } else {
      data.account_number = formData.account_number;
    }
    if (formData.account_type === "") {
      data.account_type = merchant?.merchant?.account_type;
    } else {
      data.account_type = formData.account_type;
    }
    if (formData.contactPersonPhone === "") {
      data.contactPersonPhone = merchant?.merchant?.contactPersonPhone;
    } else {
      data.contactPersonPhone = formData.contactPersonPhone;
    }
    if (formData.contactPersonEmail === "") {
      data.contactPersonEmail = merchant?.merchant?.contactPersonEmail;
    } else {
      data.contactPersonEmail = formData.contactPersonEmail;
    }
    if (formData.contactPersonDesignation === "") {
      data.contactPersonDesignation =
        merchant?.merchant?.contactPersonDesignation;
    } else {
      data.contactPersonDesignation = formData.contactPersonDesignation;
    }
    if (formData.contact_person === "") {
      data.contact_person = merchant?.merchant?.contact_person;
    } else {
      data.contact_person = formData.contact_person;
    }
    if (formData.lineOfBusiness === "") {
      data.lineOfBusiness = merchant?.merchant?.lineOfBusiness;
    } else {
      data.lineOfBusiness = formData.lineOfBusiness;
    }

    return data;
  };

  const updateMerchantDetails = async () => {
    try {
      const data = await validate();
      setLoading(true);
      confirmAlert({
        text: "This will update details of this merchant",
        confirmButtonText: "Yes, Update",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await merchantsService.updateMerchant({
            id: merchant?.merchant?._id,
            data,
          });
          await alertResponse({
            icon: res?.success ? "success" : "error",
            response: res.message,
          });
          setLoading(false);
          if (res.success) return window.location.reload();
        }
      });
      setLoading(false);
    } catch (err) {}
  };

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
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
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
              <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:min-w-sm sm:w-2/3 w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "space-between",
                    }}
                  >
                    <h4 className="underline pb-3 text-pink">Basic Details</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
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
                      editable={edit}
                      title="Line Of Business"
                      value={merchant?.merchant?.lineOfBusiness}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          lineOfBusiness: e.target.value,
                        })
                      }
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
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <UserInfo
                      editable={edit}
                      title="Contact Person"
                      value={merchant?.merchant?.contact_person}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          contact_person: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Contact Person Phone"
                      value={merchant?.merchant?.contactPersonPhone}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          contactPersonPhone: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Contact Person Email"
                      value={merchant?.merchant?.contactPersonEmail}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          contactPersonEmail: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Contact Person Designation"
                      value={merchant?.merchant?.contactPersonDesignation}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          contactPersonDesignation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <h4 className="underline pb-3 text-pink">Account Details</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <UserInfo
                      editable={edit}
                      title="Account Issuer"
                      value={merchant?.merchant?.account_issuer}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          account_issuer: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Account Issuer Name"
                      value={merchant?.merchant?.account_issuer_name}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          account_issuer_name: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Account Number"
                      value={merchant?.merchant?.account_number}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          account_number: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Account Type"
                      value={merchant?.merchant?.account_type}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          account_type: e.target.value,
                        })
                      }
                    />
                    <UserInfo
                      editable={edit}
                      title="Account Type"
                      value={merchant?.merchant?.type}
                    />
                  </div>
                  <h4 className="underline pb-3 text-pink">Wallet Details</h4>
                  <div className="grid grid-cols-3 gap-4">
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
                  {edit && (
                    <>
                      <button
                        type="button"
                        className="w-full sm:mb-0 mb-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => action()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={updateMerchantDetails}
                      >
                        {loading ? "Updating..." : "Update"}
                      </button>
                    </>
                  )}
                  {!edit && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => action()}
                    >
                      Ok
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MerchantModal;
