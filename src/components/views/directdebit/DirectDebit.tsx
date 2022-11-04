import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../header/PageHeader";
import useFetchWallets from "../wallet/UseFetchWallets";
import { reportSelector } from "../../../state/report.state";
import Select from "react-select";
import AccountsService from "../../../services/accounts.service";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";

export default function DirectDebit(): any {
  useFetchWallets();
  const { wallets, loading } = useSelector(reportSelector);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData]: any = useState({
    name: "",
    customerId: "",
    amount: "",
    description: "",
    balance: "",
  });

  const handleChange = (event: ChangeEvent<any>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSelect = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      customerId: e?.value,
      name: e?.customerName,
      balance: e?.balance,
    }));
  };

  const options =
    wallets &&
    wallets.map((wallet) => {
      return {
        label:
          wallet?.customerId?.fullname ||
          wallet?.merchantId?.merchant_tradeName,
        value: wallet?.customerId?._id || wallet?.merchantId?._id,
        customerName:
          wallet?.customerId?.fullname ||
          wallet?.merchantId?.merchant_tradeName,
        balance: wallet?.balance,
      };
    });

  const pay = async () => {
    try {
      setIsLoading(true);
      Object.keys(formData).forEach((key: any) => {
        if (!formData[key] || formData[key] === "") {
          setIsLoading(false);
          return alertResponse({
            icon: "error",
            response: "Please fill all required data",
          });
        }
      });
      const { customerId, description, amount } = formData;
      const data = {
        customerId,
        description,
        amount,
      };
      await confirmAlert({
        text: "This wallet will be debited",
        confirmButtonText: "Yes, proceed",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await AccountsService.debitWallet(data);
          alertResponse({
            icon: res.success ? "success" : "error",
            response: res?.success ? "Debit Successful" : "Sorry,try again",
          });
          setFormData({
            name: "",
            customerId: "",
            balance: "",
          });
          setIsLoading(false);
        }
      });
    } catch (err) {}
  };

  return (
    <div className="relative md:pt-10 pb-10  w-10/12 mb-12 mx-auto">
      <PageHeader title="Direct Wallet Debit" />

      <div className="flex flex-wrap">
        <div className="w-full mb-2 px-4">
          <div className="relative pb-10 p-2 w-full mb-12 px-4">
            <div className="relative md:pt-4 pb-10 p-2">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Debit Wallet Form
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col space-x-0 mb-4 px-4 lg:px-10 py-10 pt-0 mt-4">
                  <div className="w-full ">
                    <h6 className="text-left text-gray-500 text-sm mt-2 mb-6 font-bold uppercase">
                      Form Details
                    </h6>
                    <div>
                      <div className="relative mb-3">
                        <Select
                          className="basic-single border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring md:w-full ease-linear transition-all duration-150"
                          classNamePrefix="select"
                          isLoading={loading}
                          //isClearable={true}
                          isSearchable={true}
                          name="customerId"
                          value={{ label: formData.name }}
                          onChange={handleSelect}
                          options={options}
                        />
                      </div>

                      <div className="relative mb-3 ">
                        <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                          Amount
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                          Description
                        </label>
                        <textarea
                          className="
                                        mx-auto
                                        form-control
                                        block
                                        w-full
                                        h-22
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                          id="exampleFormControlTextarea1"
                          rows={3}
                          placeholder="Your message"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/**Side */}
                  <div className="w-full border-2 border-gray-200 bg-white rounded-lg text-left px-4 mt-5">
                    <h5 className="text-center text-blue-600">Receipt</h5>
                    <div className="my-3">
                      <label className="text-gray-400">ID</label>
                      <div>{formData.customerId}</div>
                    </div>
                    <div className="my-3">
                      <label className="text-gray-400">Name</label>
                      <div>{formData.name}</div>
                    </div>
                    <div className="my-3">
                      <label className="text-gray-400">Wallet Balance</label>
                      <div>{formData.balance}</div>
                    </div>
                    <div className="my-3">
                      <label className="text-gray-400">
                        Wallet Balance after deduction
                      </label>
                      <div>
                        {Number.parseFloat(formData.balance) -
                          Number.parseFloat(formData.amount)}
                      </div>
                    </div>
                    <div className="my-3">
                      <label className="text-gray-400">Description</label>
                      <div>{formData.description}</div>
                    </div>
                    <div className="my-8">
                      <button
                        onClick={() => pay()}
                        className="w-full mx-auto uppercase font-bold text-sm float-right mb-4 bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800"
                      >
                        Debit wallet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
