import { useEffect, useState, ChangeEvent } from "react";
import PendingSettlementsTable from "../../tables/PendingSettlementsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  accountsSelector,
  setPendingSettlements,
} from "../../../state/account.state";
import AccountsService from "../../../services/accounts.service";
import Spinner from "../layout/Spinner";
import SearchForm from "../../forms/SearchForm";
import "react-datepicker/dist/react-datepicker.css";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import ValueFilterSelector from "../../buttons/ValueFilterSelector";
import { OutlinedButton } from "../../buttons/BasicButton";
import { BiFilterAlt } from "react-icons/bi";
import PageHeader from "../../header/PageHeader";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";
import BlockReasonModal from "../../modal/BlockReasonModal";
import Pagination from "../../pagination/Pagination";

function AllSettlements() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactionCategory, setTransactionCategory] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [settlementId, setSettlementId] = useState("");

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    try {
      setIsLoading(true);
      const res = await AccountsService.getPendingSettlements();
      //console.log(res);
      if (!res.success) {
        setIsLoading(false);
        return alert(res.message);
      }
      dispatch(setPendingSettlements(res.data));
      setIsLoading(false);

      //Update states
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  const approve = (id: string) => {
    try {
      confirmAlert({
        text: "This will approve the selected settlement",
        confirmButtonText: "Yes, approve",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await AccountsService.approve(id);
          await alertResponse({
            icon: res.success ? "success" : "error",
            response: res.message,
          });
          if (res.success) return window.location.reload();
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };

  const decline = (id: string, reason: string) => {
    try {
      setLoading(true);
      if (reason === null || reason === "") {
        throw new Error("Please provide a reason for declining");
      }
      confirmAlert({
        text: "This settlement will be discarded",
        confirmButtonText: "Yes, decline",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await AccountsService.decline({
            id,
            reason,
          });
          setLoading(false);
          await alertResponse({
            icon: res.success ? "success" : "error",
            response: res.message,
          });
          if (res.success) return window.location.reload();
        }
        setLoading(false);
      });
    } catch (err: any) {
      setLoading(false);
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };

  const { pendingSettlements } = useSelector(accountsSelector);

  const filterResults = pendingSettlements.filter((m:any) =>
    m?.accountName
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase())
  );

  const results: any[] =
    filterResults.length === 0 ? pendingSettlements : filterResults;

  //Get Current rows
  const indexOfFirstRow: number = (currentIndex-1) * rowsPerPage;
  const indexOfLastRow: number = indexOfFirstRow + rowsPerPage;
  const currentRows = results?.slice(indexOfFirstRow, indexOfLastRow);


  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const transactionCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    setTransactionCategory(e.target.value);

  return (
    <div className="font-segoe min-h-screen relative md:pt-7 pb-10 p-2 w-full mb-12 px-4">
      {/**block Reason */}
      <BlockReasonModal
        showModal={showModal}
        action={() => decline(settlementId, reason)}
        type={"Decline"}
        reason={reason}
        onChange={(e: any) => setReason(e.target.value)}
        cancel={() => {
          setShowModal(false);
        }}
      />
      {/**page heading */}
      <PageHeader title="Pending Settlements" />
      {/**date picker */}
      <div className="flex flex-col sm:flex-row items-center space-x-2 gap-3">
        <div className="flex flex-col gap-3 nn:flex-row">
          <div className="relative">
            <input
              type="date"
              className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="End date"
              onChange={(date: any) => setStartDate(date.target.value)}
              value={startDate}
            />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <input
              type="date"
              className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="End date"
              onChange={(date: any) => setEndDate(date.target.value)}
              value={endDate}
            />
          </div>
        </div>
        {/**filter btn */}
        <div className="pb-2">
        <OutlinedButton
          value={"Filter"}
          action={() => {}}
          color="gray"
          paddingWide
          icon={<BiFilterAlt />}
        />
        </div>
      </div>
      {/**end date */}
      {/**filters */}
      <div className="my-2 flex sm:flex-row flex-col space-x-0 sm:space-x-5 gap-5">
        <div className="flex gap-5 flex-col sm:flex-row mb-1 sm:mb-0">
          <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
          <ValueFilterSelector
            setFilter={transactionCategoryHandler}
            value={transactionCategory}
            options={["name"]}
          />
        </div>
        <SearchForm
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search merchant name ..."
        />
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
          <table className="overflow-x-scroll min-w-full leading-normal">
            <thead className="text-sm">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Date Initiated
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Start Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  End Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Account Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Account Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Account Issuer
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading ? (
                <Spinner />
              ) : (
                <PendingSettlementsTable
                  data={currentRows}
                  approve={approve}
                  setShowModal={setShowModal}
                  setSettlementId={setSettlementId}
                />
              )}
            </tbody>
          </table>
          <div className="my-7">
              <Pagination
                className="pagination-bar"
                currentPage={currentIndex}
                totalCount={pendingSettlements?.length}
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
export default AllSettlements;
