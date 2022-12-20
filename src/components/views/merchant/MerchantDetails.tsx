import React, { useEffect } from "react";
import MerchantDetailsTable from "../../tables/MerchantsDetailsTable";
import PageHeader from "../../header/PageHeader";
import { useDispatch } from "react-redux";
import { setSelected } from "../../../state/merchant.state";
import { useLocation } from "react-router-dom";

function MerchantsDetails() {
  const location = useLocation();
  const merchants = location.state;
  const dispatch = useDispatch();

  useEffect(() => {
    const response = () => {
      try {
        dispatch(setSelected(merchants));
      } catch (error) {
        return error;
      }
    };
    response();
  }, []);

  return (
    <div className="relative md:pt-10 pb-10  w-full mb-12">
      <PageHeader title={`${merchants.merchant_tradeName} Details`} />

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
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Merchant ID
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?._id}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left ">
                  Merchant Trade Name
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.merchant_tradeName}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left ">
                  Email
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.email}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Registration Number
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.registrationNumber}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Line of Business
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.lineOfBusiness}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Location
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.location}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Phone
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.phone}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Tier Choice
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.tier_choice?.title}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  Monthly Limit
                </td>
                <td className="border border-slate-300 px-3 py-3 text-left">
                  {merchants?.tier_choice?.monthly_limit}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default MerchantsDetails;
