import { useEffect, useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import SettlementsTable from "../../tables/SettlementsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  accountsSelector,
  setSettlementHistory,
} from "../../../state/account.state";
import AccountsService from "../../../services/accounts.service";
import Spinner from "../layout/Spinner";
import SearchForm from "../../forms/SearchForm";
import { CSVLink } from "react-csv";
import RowNumberSelector from "../../buttons/RowNumberSelector";
//import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import { OutlinedButton } from "../../buttons/BasicButton";
import { BiFilterAlt } from "react-icons/bi";
import PageHeader from "../../header/PageHeader";
import SettlementDetailModal from "../../../components/modal/SettlementDetailModal";

function AllSettlements() {
  const group1Motion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, y: 10, transition: { duration: 2 } },
    exit: { opacity: 0, x: 0, transition: { duration: 2 } },
  };
  const group2Motion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 10, transition: { duration: 2 } },
    exit: { opacity: 0, x: 0, transition: { duration: 2 } },
  };

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [settlement, setSettlement] = useState(null);

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    try {
      setIsLoading(true);
      const res = await AccountsService.getSettlements();
      if (!res.success) {
        alert(res.message);
      }
      let results = res.data.filter(
        (s: any) => s.settlementStatus !== "pending"
      );
      dispatch(setSettlementHistory(results));
      setIsLoading(false);

      //Update states
    } catch (err: any) {}
  };

  const { settlementHistory } = useSelector(accountsSelector);

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const filterResults = settlementHistory?.filter((r: any) => {
    const hasSearchResults: boolean = r?.accountName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (hasSearchResults) return r;
  });

  const results: any[] =
    filterResults.length === 0 ? settlementHistory : filterResults;

  //Get Current Rows
  const indexofLastRow: number = currentIndex * rowsPerPage;
  const indexofFirstRow: number = indexofLastRow - rowsPerPage;
  const currentRows = results.slice(indexofFirstRow, indexofLastRow);

  //button actions
  const paginateFront = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const paginateBack = () => setCurrentIndex(currentIndex - 1);

  const headers = [
    { label: "Date", key: "createdAt" },
    { label: "Merchant Id", key: "merchantId" },
    { label: "Description", key: "description" },
    { label: "startDate", key: "startDate" },
    { label: "endDate", key: "endDate" },
    { label: "Account Number", key: "accountNumber" },
    { label: "Account Issuer", key: "accountIssuerName" },
    { label: "Account Type", key: "accountType" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "actualAmount" },
  ];

  return (
    <div className="relative md:pt-7 pb-10 p-2 w-full mb-12 px-4 font-segoe">
      <SettlementDetailModal
        showModal={showModal}
        action={() => setShowModal(false)}
        settlement={settlement}
      />
      {/**page heading */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={group1Motion}
      >
        <PageHeader title="Settlements History" />

        {/**download button */}

        {/**date picker */}
        <div className="flex items-center flex-col sm:flex-row gap-2 space-x-2">
          <div className="flex flex-col gap-3 nn:flex-row">
            <div className="relative">
              <input
                type="date"
                className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start date"
                onChange={(date: any) => setStartDate(date.target.value)}
                value={startDate}
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              <input
                type="date"
                className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start date"
                onChange={(date: any) => setEndDate(date.target.value)}
                value={endDate}
              />
            </div>
          </div>

          {/**filter btn */}
          <OutlinedButton
            value={"Filter"}
            action={() => {}}
            color="gray"
            icon={<BiFilterAlt />}
          />
        </div>

        {/**end date */}

        {/**filters */}
        <div className="my-2 flex sm:flex-row flex-col space-x-0 sm:space-x-5 gap-5">
          <div className="flex flex-row mb-1 sm:mb-0 gap-4">
            <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
            {/* <ValueFilterSelector setFilter={setCategory} value={category} options={['name']}/> */}
          </div>
          <SearchForm
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search merchant name ..."
          />
        </div>
        <CSVLink
          headers={headers}
          data={settlementHistory}
          filename={"settlements.csv"}
          className="py-2 my-4 px-1 bg-green-500  text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2"
        >
          Download CSV
        </CSVLink>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={group2Motion}
      >
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-lg overflow-hidden">
            <table className="overflow-x-scroll min-w-full leading-normal">
              <thead className="text-sm">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Date
                  </th>
                  {/* <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                                Merchant Id
                            </th> */}
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Start Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    End Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Acc_Number
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left  tracking-wider">
                    Acc_Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Acc_Issuer
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Acc_Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <SettlementsTable
                    data={currentRows}
                    setShowModal={setShowModal}
                    setSettlement={setSettlement}
                  />
                )}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing <span>{currentIndex * rowsPerPage - 10} </span> to{" "}
                <span>
                  {currentIndex * rowsPerPage < settlementHistory.length
                    ? currentIndex * rowsPerPage
                    : settlementHistory.length}
                </span>{" "}
                of <span>{settlementHistory.length}</span> settlements
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                {currentIndex === 1 ? (
                  <button className="text-sm bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-l opacity-50 cursor-not-allowed">
                    Prev
                  </button>
                ) : (
                  <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    onClick={paginateBack}
                  >
                    Prev
                  </button>
                )}
                {currentIndex * rowsPerPage === settlementHistory.length ? (
                  <button
                    className="cursor-not-allowed text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    onClick={paginateFront}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    onClick={paginateFront}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default AllSettlements;
