import React from "react";
import { formatCurrency, formatDate } from "../../utils/Date";
import MerchantConfigTableOptions from "../dropdowns/MerchantConfigTableOptions";

type AppProps = {
  merchants: any[];
  getApps: Function;
  blockMerchant: Function;
  viewUsers: Function;
  setShowModal: Function;
  setMerchant: Function;
  approvedDetails: Function;
};

const MerchantsConfigTable = ({
  merchants,
  getApps,
  blockMerchant,
  setMerchant,
  setShowModal,
  viewUsers,
  approvedDetails,
}: AppProps): JSX.Element => (
  <>
    {merchants.map((m: any) => (
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(m?.merchant?.createdAt)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
          <p className="text-gray-900 whitespace-no-wrap">
            {m?.merchant?.merchant_tradeName}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
          <p className="text-gray-900 whitespace-no-wrap">{m?.apps.length}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">
              {formatCurrency(m?.wallet?.balance)}
            </span>
          </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
          {!m?.merchant.blocked ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
              <span
                aria-hidden
                className="absolute inset-0 bg-sgreen rounded-md"
              ></span>
              <span className="relative">Active</span>
            </span>
          ) : (
            <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
              <span
                aria-hidden
                className="absolute inset-0 bg-red-500 rounded-md"
              ></span>
              <span className="relative">Blocked</span>
            </span>
          )}
        </td>
        <td className="text-left px-2 py-2 border-b border-gray-200 bg-white">
          <MerchantConfigTableOptions
            isBlocked={m?.merchant?.blocked}
            approvedDetails={() => approvedDetails(m?.merchant._id)}
            seeDetails={() => {
              setShowModal(true);
              setMerchant(m);
            }}
            blockMerchant={() => {
              blockMerchant(m?.merchant._id, m?.merchant?.blocked);
            }}
            seeApps={() => getApps(m?.merchant._id)}
            viewUsers={() => viewUsers(m?.merchant._id)}
          />
          {/* <p className="whitespace-no-wrap">
                   <button onClick={()=>{getApps(m?.merchant._id)}} className="text-md font-segoe text-blue-500 tracking-tight py-2 px-2 hover:underline">See Apps</button> 
                </p> */}
        </td>
      </tr>
    ))}
  </>
);

export default MerchantsConfigTable;
