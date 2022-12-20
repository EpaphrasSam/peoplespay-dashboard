import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { merchantsSelector } from "../../../state/merchant.state";
import MerchantsService from "../../../services/merchant.service";
import MerchantDetailsTable from "../../tables/MerchantsDetailsTable";
import MerchantsTable from "../../tables/MerchantsTable";
import Spinner from "../layout/Spinner";
import { setSelected } from "../../../state/merchant.state";
import SearchForm from "../../forms/SearchForm";
import RowNumberSelector from "../../buttons/RowNumberSelector";
//import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import PageHeader from "../../header/PageHeader";
import useFetchMerchants from "./useFetchMerchants";
import { OutlinedButton } from "../../buttons/BasicButton";
import Loader from "../users/Loader";
import { BiFilterAlt } from "react-icons/bi";
import { CSVLink } from "react-csv";
import { HiDownload } from "react-icons/hi";
import Pagination from "../../pagination/Pagination";

function Merchants() {
  useFetchMerchants();
  const { merchants, loading } = useSelector(merchantsSelector);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [merchantCategory, setMerchantCategory] = useState<string>("");

  const filterResults = merchants.filter((mr) => {
    switch (merchantCategory) {
      case "name":
        const hasSearchResults: boolean = mr?.merchant_tradeName
          ?.toLowerCase()
          .startsWith(searchQuery.toLowerCase());
        if (hasSearchResults) return mr;
        break;
      case "category":
        const hasSearchResults2: boolean = mr?.lineOfBusiness
          ?.toLowerCase()
          .startsWith(searchQuery.toLowerCase());
        if (hasSearchResults2) return mr;
        break;
      default:
        return mr;
    }
  });

  console.log(merchants);

  const merchantCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    setMerchantCategory(e.target.value);

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const results: any[] = filterResults.length === 0 ? merchants : filterResults;

  const firstPageIndex = (currentPage - 1) * rowsPerPage;
  const lastPageIndex = firstPageIndex + rowsPerPage;
  const currentTableData = results?.slice(firstPageIndex, lastPageIndex);

  // const handleSelectedId: Function = async (id: string) => {

  // };

  const unapprovedMerchants = merchants.filter((m) => m.submitted && !m.active);

  const headers = [
    { label: "MERCHANT ID", key: "_id" },
    { label: "TRADENAME", key: "merchant_tradeName" },
    { label: "EMAIL", key: "email" },
    { label: "REGISTRATION NUMBER", key: "registrationNumber" },
    { label: "LINE OF BUSINESS", key: "lineOfBusiness" },
    { label: "LOCATION", key: "location" },
    { label: "PHONE", key: "phone" },
  ];

  return (
    <div className="relative min-h-screen md:pt-10 pb-10  w-full mb-12">
      <PageHeader title="Merchants Onboarding" />

      {/**date picker */}
      <div className="flex flex-col nn:flex-row items-center space-x-2">
        <div className="flex flex-row gap-4 pb-2">
          <div>
            <input
              type="date"
              className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm fo focu"
              placeholder="Start date"
              onChange={(date: any) => setStartDate(date.target.value)}
              value={startDate}
            />
          </div>
          <div>
            <input
              type="date"
              className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm fo focu"
              placeholder="End date"
              onChange={(date: any) => setEndDate(date.target.value)}
              value={endDate}
            />
          </div>
        </div>
        {/**filter btn */}
        <div className="pb-4">
          <OutlinedButton
            value={loading ? <Loader /> : "Filter"}
            action={() => {}}
            color="gray"
            icon={<BiFilterAlt />}
          />
        </div>
      </div>
      <div className="my-2 flex sm:flex-row flex-col pt-0 space-x-2 items-center">
        <div className="flex nn:flex-row flex-col mb-1 sm:mb-0  gap-4">
          <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
          <div className="relative">
            <select
              onChange={merchantCategoryHandler}
              value={merchantCategory}
              className="h-full rounded-r border-t sm:rounded-r-none border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focu"
            >
              <option>column search</option>
              <option value="name">comp name</option>
              <option value="category">comp category</option>
            </select>
          </div>
          <SearchForm
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value.trim())
            }
            placeholder={`Search by ${merchantCategory}`}
          />
        </div>
      </div>
      <div>
        <CSVLink
          headers={headers}
          data={unapprovedMerchants}
          filename={"onboarding-merchants.csv"}
          className="py-2 px-2 text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-15 bg-green-500 tracking-wide font-inter inline-flex items-center space-x-1"
        >
          <HiDownload />
          <span>{"Download"}</span>
        </CSVLink>
      </div>
      <div className="flex sm:flex-row pt-4 flex-col">
        <div className="w-full mb-12 md:mb-0">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center"></div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead className="text-xs text-gray-600">
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left">
                      Date created
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left"
                      }
                    >
                      Company Name
                    </th>
                    {/* <th className="px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left">
                      Submitted
                    </th> */}
                    <th className="px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left ">
                      Status
                    </th>
                    {/* <th className="px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left">
                      Declined
                    </th> */}
                    <th className="px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <MerchantsTable merchants={currentTableData} />
                  )}
                </tbody>
              </table>
              {/** Pagination */}
              <div className="my-7">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={merchants?.length}
                  pageSize={rowsPerPage}
                  onPageChange={(page: React.SetStateAction<number>) =>
                    setCurrentPage(page)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Merchants;
