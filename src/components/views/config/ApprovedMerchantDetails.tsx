import React, { ChangeEvent, useState, useEffect } from "react";
import MerchantDetailsTable from "../../tables/MerchantsDetailsTable";
import PageHeader from "../../header/PageHeader";
import { useLocation } from "react-router-dom";
import { setSelected } from "../../../state/merchant.state";
import { useDispatch } from "react-redux";

function ApprovedMerchantsDetails() {
  const location = useLocation();
  const merchants = location.state;
  const dispatch = useDispatch();
  console.log(merchants.merchant);

  useEffect(() => {
    const response = () => {
      try {
        dispatch(setSelected(merchants.merchant));
      } catch (error) {
        return error;
      }
    };
    response();
  }, []);

  return (
    <div className="relative md:pt-10 pb-10  w-full mb-12">
      <PageHeader title={`${merchants.merchant.merchant_tradeName} Details`} />

      <div className="flex pt-4 md:flex-row flex-col">
        <div className="w-full md:w-2/3">
          <MerchantDetailsTable />
        </div>
        <div className="md:w-1/3 w-full overflow-x-auto">
          <table className="w-full border-separate border border-slate-400 ">
            <thead className="font-semibold text-lg text-blueGray-700 text-center">
              Basic Details
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Merchant ID
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?._id}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Merchant Trade Name
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.merchant_tradeName}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Email
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.email}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Registration Number
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.registrationNumber}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Line of Business
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.lineOfBusiness}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Location
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.location}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Phone
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.phone}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Tier Choice
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.tier_choice?.title}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Monthly Limit
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.tier_choice?.monthly_limit}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-6 py-3 text-left">
                  Documents Needed
                </td>
                <td className="border border-slate-300 px-6 py-3">
                  {merchants.merchant?.tier_choice?.documents}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ApprovedMerchantsDetails;
