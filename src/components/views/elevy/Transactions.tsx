import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchElevy from "./useFetchElevy";
import ElevyTransactionsTable from "../../tables/ElevyTransactionsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  elevySelector,
  setTransactions,
  setRecords,
} from "../../../state/elevy.state";
import Spinner from "../layout/Spinner";
import { CSVLink } from "react-csv";
import { HiDownload } from "react-icons/hi";
import { OutlinedButton } from "../../buttons/BasicButton";
import Loader from "../users/Loader";
import { BiFilterAlt } from "react-icons/bi";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import elevyService from "../../../services/elevy.services";
import PageHeader from "../../header/PageHeader";
import Pagination from "../../pagination/Pagination";
import SearchForm from "../../forms/SearchForm";

function ElevyTransactions() {
  useFetchElevy();
  const navigate = useNavigate();
  const { records, loading } = useSelector(elevySelector);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentIndex, setCurrentIndex] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const goTo = (data: any) => {
    dispatch(setTransactions(data));
    navigate("/e-levy/transactions");
  };

  const periodFilter = async () => {
    try {
      const data = {
        startDate,
        endDate,
      };
      const res = await elevyService.filterElevyPeriod(data);
      if (!res?.success) return res.message;
      dispatch(setRecords(res?.data));
    } catch (err) {}
  };

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const filterResults = records.filter((m:any) =>
    m?.totalAmount
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase())
  );

  const results: any[] =
    filterResults.length === 0 ? records : filterResults;
  
  //Get Current rows
  const indexOfFirstRow: number = (currentIndex-1) * rowsPerPage;
  const indexOfLastRow: number = indexOfFirstRow + rowsPerPage;
  const currentRows = results?.slice(indexOfFirstRow, indexOfLastRow);

  const headers = [
    { label: "Date", key: "date" },
    { label: "Id", key: "_id" },
    { label: "Amount", key: "amount" },
    { label: "Count", key: "count" },
  ];

  return (
    <div className="relative min-h-screen md:pt-10 pb-10 p-2 w-full mb-12 px-4">
      {/**page heading */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={group1Motion}
      >
        <PageHeader title="Elevy Records" />

        {/**date picker */}
        <div className="flex flex-col items-center gap-10 px-2">
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
                  placeholder="End date"
                  onChange={(date: any) => setEndDate(date.target.value)}
                  value={endDate}
                />
              </div>
            </div>
            {/**filter btn */}
            <div className="mb-2">
            <OutlinedButton
              value={loading ? <Loader /> : "Filter"}
              action={() => periodFilter()}
              color="gray"
              icon={<BiFilterAlt />}
            />
            </div>
          </div>
          {/**end date */}

          {/**csv btn */}
          <div>
            <CSVLink
              headers={headers}
              data={records}
              filename={"elevyrecords.csv"}
              className="py-2 px-1 bg-green-500  text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2"
            >
              <HiDownload />
              Download CSV
            </CSVLink>
          </div>
        </div>
        {/**end date */}

        {/**filters */}
        <div className="my-2 ml-2 gap-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
          </div>
          <SearchForm
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value.trim())
              }
              placeholder={`Search total Amount ...`}
            />
        </div>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={group2Motion}
      >
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
          <div className="inline-block min-w-full shadow-lg overflow-hidden">
            <table className="overflow-x-scroll min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                    Id
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                    Number of Transactions
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                    Taxable Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                    Accumulated Elevy
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-md">
                {loading ? (
                  <Spinner />
                ) : (
                  <ElevyTransactionsTable data={currentRows} goTo={goTo} />
                )}
              </tbody>
            </table>
            <div className="my-7">
              <Pagination
                className="pagination-bar"
                currentPage={currentIndex}
                totalCount={records?.length}
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
export default ElevyTransactions;
