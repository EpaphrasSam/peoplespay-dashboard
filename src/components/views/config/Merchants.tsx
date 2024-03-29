import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import MerchantsConfigTable from "../../tables/MerchantConfigTable";
import {
  merchantsSelector,
  setApps,
  setMerchantName,
} from "../../../state/merchant.state";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import SearchForm from "../../forms/SearchForm";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import ValueFilterSelector from "../../buttons/ValueFilterSelector";
import useFetchMerchants from "./useFetchApprovedMerchants";
import PageHeader from "../../header/PageHeader";
import merchantsService from "../../../services/merchant.service";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";
import MerchantModal from "../../modal/MerchantDetailModal";
import { CSVLink } from "react-csv";
import { HiDownload } from "react-icons/hi";
import Pagination from "../../pagination/Pagination";

function MerchantsConfig() {
  const navigate = useNavigate();
  useFetchMerchants();
  const { approvedMerchants, loading } = useSelector(merchantsSelector);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState("merchant");
  const [showModal, setShowModal] = useState(false);
  const [merchant, setMerchant] = useState<any[]>([]);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const getApps = async (id: string) => {
    try {
      approvedMerchants.filter((m) => {
        if (m?.merchant?._id === id) {
          dispatch(setApps(m?.apps));
          dispatch(setMerchantName(m?.merchant.merchant_tradeName));
        }
      });
      return navigate("/merchants/apps");
    } catch (err) {}
  };

  const getUsers = (id: string) => {
    try {
      navigate("/merchants/all/merchant/allusers", { state: id });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const approvedDetails = (id: string) => {
    try {
      approvedMerchants.filter((m) => {
        if (m?.merchant?._id === id) {
          navigate("/merchants/all/approved/details", { state: m });
        }
      });
    } catch (err: any) {
      alert(err.message);
    }
    console.log(id);
  };

  const data = approvedMerchants.map((d) => d.merchant);
  // console.log(data);

  const blockMerchant = (id: string, blocked: boolean) => {
    try {
      confirmAlert({
        text: blocked
          ? "This will unblock this merchant"
          : "This will block this merchant",
        confirmButtonText: blocked
          ? "Yes, unblock merchant"
          : "Yes, block merchant",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await merchantsService.updateMerchant({
            id,
            data: {
              blocked: blocked ? "false" : "true",
            },
          });
          await alertResponse({
            icon: res?.success ? "success" : "error",
            response: res.message,
          });
          if (res.success) return window.location.reload();
        }
      });
    } catch (err) {}
  };

  const filterResults = approvedMerchants.filter((m) =>
    m?.merchant?.merchant_tradeName
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase())
  );

  const results: any[] =
    filterResults.length === 0 ? approvedMerchants : filterResults;

  //Get Current rows
  const indexOfFirstRow: number = (currentIndex - 1) * rowsPerPage;
  const indexOfLastRow: number = indexOfFirstRow + rowsPerPage;
  const currentRows = results?.slice(indexOfFirstRow, indexOfLastRow);

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const headers = [
    { label: "MERCHANT ID", key: "_id" },
    { label: "ADDRESS", key: "address" },
    { label: "EMAIL", key: "email" },
    { label: "LINE OF BUSINESS", key: "lineOfBusiness" },
    { label: "LOCATION", key: "location" },
    { label: "MERCHANT TRADE NAME", key: "merchant_tradeName" },
    { label: "REGISTRATION NUMBER", key: "registrationNumber" },
    { label: "PHONE", key: "phone" },
  ];

  return (
    <div className="relative min-h-screen md:pt-10 pb-10 p-2 w-full mb-12 px-4 font-segoe">
      <PageHeader title="Approved Merchants" />

      <div className="flex flex-row justify-between items-center">
        {/**filters */}
        <div className="flex flex-row gap-5 items-center justify-between">
          <div className="my-2 gap-4 flex sm:flex-row flex-col">
            <div className="flex sm:gap-3 gap-5 flex-col mb-1 sm:mb-0 sm:flex-row">
              <div>
                <RowNumberSelector
                  value={rowsPerPage}
                  onChange={pageRowsHandler}
                />
              </div>
              <div className="pr-1">
                <ValueFilterSelector
                  setFilter={setCategory}
                  value={category}
                  options={[]}
                />
              </div>
            </div>
            <SearchForm
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value.trim())
              }
              placeholder={`Search ${category} name ...`}
            />
          </div>
        </div>
        <div>
          <CSVLink
            headers={headers}
            data={data}
            filename={"approved-merchants.csv"}
            className="py-2 px-1 bg-green-500  text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2"
          >
            <HiDownload />
            <span>{"Download Report"}</span>
          </CSVLink>
        </div>
      </div>
      <MerchantModal
        showModal={showModal}
        action={() => setShowModal(false)}
        merchant={merchant}
      />
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Date Created
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Apps Count
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Wallet Balance
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                <MerchantsConfigTable
                  approvedDetails={approvedDetails}
                  merchants={currentRows}
                  getApps={getApps}
                  blockMerchant={blockMerchant}
                  setMerchant={setMerchant}
                  setShowModal={setShowModal}
                  viewUsers={getUsers}
                />
              )}
            </tbody>
          </table>
          <div className="my-7">
            <Pagination
              className="pagination-bar"
              currentPage={currentIndex}
              totalCount={approvedMerchants?.length}
              pageSize={rowsPerPage}
              onPageChange={(page: React.SetStateAction<number>) =>
                setCurrentIndex(page)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MerchantsConfig;
