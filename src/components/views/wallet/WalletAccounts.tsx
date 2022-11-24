import React, { useState, ChangeEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetchWallets from "./UseFetchWallets";
import WalletAccounts from "../../tables/WalletsTable";
import {
  reportSelector,
  setWalletTransactions,
  setCustomerName,
} from "../../../state/report.state";
import { useDispatch, useSelector } from "react-redux";
import ReportService from "../../../services/reports.service";
import Spinner from "../layout/Spinner";
import SearchForm from "../../forms/SearchForm";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import ValueFilterSelector from "../../buttons/ValueFilterSelector";
import PageHeader from "../../header/PageHeader";
import { ReportModel } from "../../../models/report.model";
import Pagination from "../../pagination/Pagination";

function Wallets() {
  useFetchWallets();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, wallets } = useSelector(reportSelector);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("merchant");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const goTo = async (id: string, name: any) => {
    try {
      const res = await ReportService.getWalletTransactions(id);
      if (res.success) {
        const transactions = res?.data?.map((d: any) => new ReportModel(d));
        dispatch(setWalletTransactions(transactions));
        dispatch(setCustomerName(name));
        navigate("/wallets/transactions");
      }
    } catch (err) {}
  };

  const filterResults = wallets?.filter((cus) => {
    switch (category) {
      case "merchant":
        const hasSearchResults: boolean = cus?.merchantId?.merchant_tradeName
          ?.toLowerCase()
          .startsWith(searchQuery?.toLowerCase());
        if (hasSearchResults) return cus;
        break;
      case "customer":
        const hasSearchResults2: boolean = cus?.customerId?.fullname
          ?.toLowerCase()
          .startsWith(searchQuery?.toLowerCase());
        if (hasSearchResults2) return cus;
        break;
      default:
        return cus;
    }
  });

  const results: any[] = filterResults.length === 0 ? wallets : filterResults;

  const firstPageIndex = (currentPage - 1) * rowsPerPage;
  const lastPageIndex = firstPageIndex + rowsPerPage;
  const currentTableData = results?.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
      <PageHeader title="Wallets" />

      {/**filters */}
      <div className="my-2 flex sm:flex-row flex-col space-x-0 sm:space-x-5 gap-5">
        <div className="flex gap-5 flex-col sm:flex-row mb-1 sm:mb-0">
          <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
          <ValueFilterSelector
            setFilter={setCategory}
            value={category}
            options={["merchant", "customer"]}
          />
        </div>
        <SearchForm
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value.trim())
          }
          placeholder={`Search ${category} name ...`}
        />
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-lg overflow-hidden">
          <table className="min-w-full leading-normal font-segoe mb-3">
            <thead className="text-xs">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Total Balance
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Last Balance
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Actual Balance
                </th>
                {/* <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Charge
                            </th> */}
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Date Updated
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <Spinner />
              ) : (
                <WalletAccounts wallets={currentTableData} goTo={goTo} />
              )}
            </tbody>
          </table>
          {/** Pagination */}
          <div className="my-7">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={wallets?.length}
              pageSize={rowsPerPage}
              onPageChange={(page: React.SetStateAction<number>) =>
                setCurrentPage(page)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Wallets;
