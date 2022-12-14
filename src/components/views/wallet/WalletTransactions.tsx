import { useState, ChangeEvent, useEffect } from "react";
import { motion } from "framer-motion";
import WalletTransactionsTable from "../../tables/WalletTransactionsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  reportSelector,
  setWalletTransactions,
} from "../../../state/report.state";
import SearchForm from "../../forms/SearchForm";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import Loader from "../users/Loader";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import ValueFilterSelector from "../../buttons/ValueFilterSelector";
import { OutlinedButton } from "../../buttons/BasicButton";
import { BiFilterAlt } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import PageHeader from "../../header/PageHeader";
import TransactionDetailsModal from "../../modal/WalletTransactionDetailModal";
import Spinner from "../layout/Spinner";
import Pagination from "../../pagination/Pagination";
import { ReportModel } from "../../../models/report.model";
import ReportService from "../../../services/reports.service";
import { useLocation } from "react-router-dom";

function WalletTransactions() {
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

  const { walletTransactions, customerName, loading } =
    useSelector(reportSelector);

  const dispatch = useDispatch();

  const headers = [
    { label: "TRANSACTION ID", key: "_id" },
    { label: "NARRATION", key: "description" },
    { label: "CUSTOMER REFERENCE", key: "reference" },
    { label: "TRANSACTION DATE", key: "createdAt" },
    { label: "TRANSACTION TIME", key: "time" },
    { label: "TRANSACTION TYPE", key: "transaction_type" },
    { label: "CUSTOMER NAME", key: "customerName" },
    { label: "CUSTOMER PHONE NUMBER", key: "customerPhone" },
    { label: "PAYMENT ACCOUNT NUMBER", key: "paymentNumber" },
    { label: "PAYMENT ACCOUNT ISSUER", key: "paymentIssuer" },
    { label: "PAYMENT ACCOUNT TYPE", key: "payment_account_type" },
    { label: "AMOUNT", key: "actualAmount" },
    { label: "CHARGES", key: "charges" },
    { label: "E-LEVY CHARGES", key: "elevyCharges" },
    { label: "TOTAL AMOUNT", key: "amount" },
    { label: "RECIPIENT NAME", key: "recipientName" },
    { label: "RECIPIENT NUMBER", key: "recipientNumber" },
    { label: "RECIPIENT ISSUER", key: "recipientIssuer" },
    { label: "CREDIT STATUS", key: "status" },
    { label: "DEBIT STATUS", key: "debit_status" },
  ];

  const [transaction, setTransaction] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  const [isLoading, setLoading] = useState(false);

  //const [totalTransactionCount, setTotalTransactionCount] = useState<string>('0')
  const [searchQuery, setSearchQuery] = useState("");
  //const [searchBy , setSearchBy] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactionCategory, setTransactionCategory] = useState<string>("");
  const location = useLocation();
  const id = location.state.id;
  const name = location.state.name;
  console.log(walletTransactions);

  const filterResults = walletTransactions.filter((tr) => {
    switch (transactionCategory) {
      case "description":
        const hasSearchResults: boolean = tr?.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        if (hasSearchResults) return tr;
        break;
      case "recipientName":
        const hasSearchResults2: boolean = tr?.recipientName
          ?.toLowerCase()
          .includes(searchQuery);
        if (hasSearchResults2) return tr;
        break;
      case "createdAt":
        const hasSearchResults3: boolean = tr?.createdAt
          ?.toLowerCase()
          .includes(searchQuery);
        if (hasSearchResults3) return tr;
        break;
      default:
        return tr;
    }
  });

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const transactionCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    setTransactionCategory(e.target.value);

  const results: any[] =
    filterResults.length === 0 ? walletTransactions : filterResults;

  //Get Current rows
  const indexOfFirstRow: number = (currentIndex - 1) * rowsPerPage;
  const indexOfLastRow: number = indexOfFirstRow + rowsPerPage;
  const currentRows = results?.slice(indexOfFirstRow, indexOfLastRow);

  const clickDateFilter = async () => {
    try {
      setLoading(true);
      const res = await ReportService?.WalletTransactionsFilter(
        startDate,
        endDate,
        id
      );
      const walletTransactions = res.data.map((d: any) => new ReportModel(d));
      dispatch(setWalletTransactions(walletTransactions));
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      alert(err.message);
    }
  };

  useEffect(() => {
    const response = async () => {
      try {
        setLoading(true);
        const res = await ReportService?.WalletTransactionsFilter(
          startDate,
          endDate,
          id
        );
        console.log(res);

        const walletTransactions = res.data.map((d: any) => new ReportModel(d));
        dispatch(setWalletTransactions(walletTransactions));
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        alert(err.message);
      }
    };
    response();
  }, []);

  return (
    <div className="relative min-h-screen md:pt-7 pb-10 p-2 w-full mb-12 px-4">
      {/**page heading */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={group1Motion}
      >
        <PageHeader title={`${name} Transactions History`} />
      </motion.div>

      {/**date picker */}
      <div className="flex items-center flex-col sm:flex-row gap-2 space-x-2">
        <div className="flex flex-col gap-3 nnn:flex-row">
          <div className="relative">
            <DatePicker
              selected={startDate}
              value={startDate}
              onChange={(date) => setStartDate(date)}
              className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              dateFormat="dd/MM/yyyy"
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <DatePicker
              selected={endDate}
              value={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
              className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              dateFormat="dd/MM/yyyy"
              selectsEnd
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
        {/**filter btn */}
        <div className="pb-2">
          <OutlinedButton
            value={isLoading ? <Loader /> : "Filter"}
            action={() => clickDateFilter()}
            color="gray"
            paddingWide
            icon={<BiFilterAlt />}
          />
        </div>
      </div>
      {/**end date */}

      {/**filters */}
      <div className="my-2 flex sm:flex-row flex-col  space-x-0 sm:space-x-5 gap-1">
        <div className="flex gap-5 flex-col sm:flex-row mb-1 sm:mb-0">
          <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
          <div className="relative">
            <select
              onChange={transactionCategoryHandler}
              value={transactionCategory}
              className="h-full rounded-r border-t sm:rounded-r-none border-r border-b block appearance-none bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
            >
              <option value="none" selected>
                search column
              </option>
              <option value="description">description</option>
              <option value="recipientName">recipientName</option>
              <option value="createdAt">createdAt</option>
            </select>
          </div>
        </div>
        <SearchForm
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder={`Search ${transactionCategory}`}
        />
      </div>
      <div className="space-x-2 mr-12">
        <CSVLink
          headers={headers}
          data={results}
          filename={"report.csv"}
          className="py-1.5 px-1.5 bg-green-500 border-2 border-green-500 text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2"
        >
          <HiDownload />
          <span>{isLoading ? "Preparing..." : "Download Report"}</span>
        </CSVLink>
      </div>
      <TransactionDetailsModal
        transaction={transaction}
        action={() => {
          setShowModal(false);
        }}
        showModal={showModal}
      />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={group2Motion}
      >
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-lg overflow-hidden font-segoe">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Transaction Time
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Recipient Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Charge
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    E-levy
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Debit Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Credit Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Pay_Acc_Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Spinner />
                ) : (
                  <WalletTransactionsTable
                    transactions={currentRows}
                    setShowModal={setShowModal}
                    setTransaction={setTransaction}
                  />
                )}
              </tbody>
            </table>
            <div className="my-7">
              <Pagination
                className="pagination-bar"
                currentPage={currentIndex}
                totalCount={walletTransactions?.length}
                pageSize={rowsPerPage}
                onPageChange={(page: React.SetStateAction<number>) =>
                  setCurrentIndex(page)
                }
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default WalletTransactions;
