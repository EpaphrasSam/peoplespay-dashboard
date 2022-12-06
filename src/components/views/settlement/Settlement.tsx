import React, { ChangeEvent, useEffect, useState } from "react";
import { setMerchants } from "../../../state/merchant.state";
import { useDispatch, useSelector } from "react-redux";
import MerchantsService from "../../../services/merchant.service";
import AccountsService from "../../../services/accounts.service";
import { setIssuers } from "../../../state/account.state";
import PageHeader from "../../header/PageHeader";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";
import { authSelector } from "../../../state/auth.state";

export default function Users() {
  const dispatch = useDispatch();
  const [isNecLoading, setIsNecLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [merc, setmerc] = useState<any>([]);

  const { merchants } = useSelector((state: any) => state.merchants);
  const { issuers } = useSelector((state: any) => state.accounts);
  const { user } = useSelector(authSelector);

  const [formData, setFormData]: any = useState({
    merchantId: "",
    accountType: "",
    startDate: "",
    endDate: "",
    accountIssuer: "",
    accountIssuerName: "",
    accountNumber: "",
    accountName: "",
    description: "",
    amount: "",
    admin: user?._id,
  });

  useEffect(() => {
    loadMerchantsandIssuers();
  }, []);

  const onIssuer = (event: ChangeEvent<any>): void => {
    try {
      const id: string = event.target.value;
      const _details: any = issuers.find((iss: any) => iss.id === id);
      setFormData({
        ...formData,
        accountIssuer: _details["id"],
        accountIssuerName: _details["name"],
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const verifyNumberDetails = async () => {
    try {
      setIsNecLoading(true);
      const { accountNumber, accountIssuer } = formData;
      const res = await AccountsService.nec({
        account_number: accountNumber,
        account_issuer: accountIssuer,
        account_type: "bank",
      });
      if (!res.success) {
        setIsNecLoading(false);
        return alert(res.message);
      }
      setIsNecLoading(false);
      setFormData({
        ...formData,
        accountName: res?.data,
      });
    } catch (error) {
      setIsNecLoading(false);
    }
  };

  const handleChangeInput = (event: ChangeEvent<any>) => {
    const merch = merchants.filter((m: any) => event.target.value === m._id);
    setFormData({
      ...formData,
      merchantId: merch.length !== 0 ? merch[0]._id : "",
      accountType: merch.length !== 0 ? merch[0].type : "",
      accountIssuer: merch.length !== 0 ? merch[0].account_issuer : "",
      accountIssuerName: merch.length !== 0 ? merch[0].account_issuer : "",
      accountNumber: merch.length !== 0 ? merch[0].account_number : "",
      accountName: merch.length !== 0 ? merch[0].account_name : "",
    });
    setmerc(merch);
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const loadMerchantsandIssuers = async () => {
    try {
      const [merchants, issuers] = await Promise.all([
        MerchantsService.getMerchants(),
        AccountsService.getIssuers(),
      ]);
      if (!merchants.success && !issuers.success) {
        throw Error("Oops there is a problem loading some of the services");
      }
      dispatch(setMerchants(merchants.data || []));
      dispatch(setIssuers(issuers.data || []));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const pay = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      setIsLoading(true);
      Object.keys(formData).forEach((key: any) => {
        if (!formData[key] || formData[key] === "") {
          throw new Error("Please provide all details on the form");
        }
      });
      confirmAlert({
        text: "This will settle the selected merchant",
        confirmButtonText: "Yes, proceed",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await AccountsService.settle(formData);
          await alertResponse({
            icon: response.success ? "success" : "error",
            response: response.message,
          });
          setIsLoading(false);
          return setFormData({
            merchantId: "",
            accountType: "",
            startDate: "",
            endDate: "",
            accountIssuer: "",
            accountIssuerName: "",
            accountNumber: "",
            accountName: "",
            description: "",
            amount: "",
          });
        }
        alertResponse({
          icon: "error",
          response: "You cancelled the transaction",
        });
      });
    } catch (err: any) {
      setIsLoading(false);
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };

  return (
    <div className="relative md:pt-10 pb-10  w-full mb-12">
      <PageHeader title="Merchant Settlement" />

      <div className="flex flex-wrap">
        <div className="w-full mb-2 px-4">
          <div className="relative pb-10 p-2 w-full mb-12 px-4">
            <div className="relative md:pt-4 pb-10 p-2">
              <form
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0"
                onSubmit={pay}
              >
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Merchant Settlement Form
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div>
                    <h6 className="text-gray-500 text-sm mt-2 mb-6 font-bold uppercase">
                      Form Details
                    </h6>
                    <div>
                      <div className="flex w-full space-x-10">
                        <div className="relative w-6/12 mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                            htmlFor="grid-password"
                          >
                            select merchant
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="merchantId"
                            required
                            onChange={handleChangeInput}
                            placeholder="select merchant"
                          >
                            <option value="" disabled selected>
                              --Select Merchant--
                            </option>
                            {merchants.map((mer: any, i: number) => (
                              <option key={i} value={mer?._id}>
                                {mer.merchant_tradeName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            Account type
                          </label>
                          {/* <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                          >
                            <option defaultValue="">choose type</option>
                            <option value="momo">momo</option>
                            <option value="bank">bank</option>
                          </select> */}
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountType"
                            defaultValue={merc.length !== 0 ? merc[0].type : ""}
                            required
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="flex w-full space-x-10">
                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            Account Issuer
                          </label>
                          {/* <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountIssuer"
                            value={formData.accountIssuer}
                            onChange={onIssuer}
                          >
                            {issuers.map((issuer: any, i: number) => (
                              <option key={i} value={issuer?.id}>
                                {issuer.name}
                              </option>
                            ))}
                          </select> */}
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountIssuer"
                            defaultValue={
                              merc.length !== 0 ? merc[0].account_issuer : ""
                            }
                            required
                            disabled={true}
                          />
                        </div>

                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            Account Issuer Name
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountIssuerName"
                            defaultValue={
                              merc.length !== 0
                                ? merc[0].account_issuer_name
                                : ""
                            }
                            required
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="flex w-full space-x-2 n:space-x-10">
                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            Account Number
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountNumber"
                            defaultValue={
                              merc.length !== 0 ? merc[0].account_number : ""
                            }
                            required
                            onChange={handleChange}
                            disabled={true}
                          />

                          {/* <button
                            className="mt-2 w-full bg-red-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            onClick={verifyNumberDetails}
                          >
                            {isNecLoading ? "verifying..." : "verify"}
                          </button> */}
                        </div>

                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            Account Name
                          </label>
                          <input
                            type="text"
                            disabled={true}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="accountName"
                            defaultValue={
                              merc.length !== 0 ? merc[0].account_name : ""
                            }
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="relative w-1/6 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            Enter Amount
                          </label>
                          <input
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="amount"
                            // value={(event: ChangeEvent<any>) =>
                            //   event.target.value
                            // }
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex w-full space-x-2 sm:space-x-10 flex-col n:flex-row">
                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            start date
                          </label>
                          <input
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-44 n:w-full  ease-linear transition-all duration-150"
                            name="startDate"
                            required
                            value={formData.startDate}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="relative w-6/12 mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                            end date
                          </label>
                          <input
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-44 n:w-full  ease-linear transition-all duration-150"
                            name="endDate"
                            value={formData.endDate}
                            required
                            onChange={handleChange}
                          />
                        </div>
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
                          required
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-8/12 mx-auto uppercase font-bold text-sm float-right mb-4 bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800"
                >
                  Submit for Approval
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
