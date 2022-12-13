import React, { FC } from "react";
import { MdReadMore } from "react-icons/md";
import { formatDate } from "../../utils/Date";
import { useNavigate } from "react-router-dom";
import MerchantConfigTableOptions from "../dropdowns/MerchantConfigTableOptions";

interface AppProps {
  merchants: {}[];
  // handleSelectedId?: () => void;
}
const MerchantsTable: FC<AppProps> = ({ merchants }) => {
  const navigate = useNavigate();
  return (
    <>
      {merchants.map((m: any, i: number) => (
        <tr key={i}>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left flex items-center">
            <span className="">{formatDate(m.createdAt)}</span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.merchant_tradeName}
          </td>
          {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.lineOfBusiness || m.category}  
        </td> */}
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
            {m?.submitted ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-sgreen leading-tight tracking-wide">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gray-50 rounded-md"
                ></span>
                <span className="relative">Submitted</span>
              </span>
            ) : (
              <span className="relative inline-block px-3 py-1 font-semibold text-red-500 leading-tight tracking-wide">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gray-50 rounded-md"
                ></span>
                <span className="relative">Not Submitted</span>
              </span>
            )}
          </td>
          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.active ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-sgreen rounded-md"
                ></span>
                <span className="relative"> Approved </span>
              </span>
            ) : (
              <span className="relative inline-block px-3 py-1 font-semibold text-yellow-500 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gray-100  rounded-md"
                ></span>
                <span className="relative">Pending Approval</span>
              </span>
            )}
          </td>
          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.decline ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-red-500 rounded-md"
                ></span>
                <span className="relative"> Declined </span>
              </span>
            ) : null}
          </td>
          <td className="flex flex-row hover:text-blue-400 border-t-0 px-3 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            <MerchantConfigTableOptions
              show={false}
              approvedDetails={() =>
                navigate("/merchants/all/onboarding/details", {
                  state: m,
                })
              }
              viewUsers={() =>
                navigate("/merchants/all/merchant/allusers", {
                  state: m._id,
                })
              }
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default MerchantsTable;
