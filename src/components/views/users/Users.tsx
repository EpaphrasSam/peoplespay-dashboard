import React, { ChangeEvent, useState } from "react";
import { usersSelector } from "../../../state/users.state";
import { useSelector } from "react-redux";
import UsersTable from "../../tables/UsersTable";
import Spinner from "../layout/Spinner";
import PageHeader from "../../header/PageHeader";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import ValueFilterSelector from "../../buttons/ValueFilterSelector";
import SearchForm from "../../forms/SearchForm";
import useFetchUsers from "./useFetchUsers";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";
import usersService from "../../../services/users.service";
import DetailsModal from "../../modal/UserDetailsModal";
import { CSVLink } from "react-csv";
import { HiDownload } from "react-icons/hi";
import Pagination from "../../pagination/Pagination";

export default function Users() {
  useFetchUsers();
  const { users, loading } = useSelector(usersSelector);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  //buttonactions
  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const filterResults = users.filter((user: any) => {
    switch (category) {
      case "name":
        const hasSearchResults: boolean = user?.fullname
          .toLowerCase()
          .startsWith(searchQuery?.toLowerCase());
        if (hasSearchResults) return user;
        break;
      case "phone":
        const hasSearchResults2: boolean = user?.phone
          ?.toLowerCase()
          .startsWith(searchQuery?.toLowerCase());
        if (hasSearchResults2) return user;
        break;
      default:
        return user;
    }
  });

  const results: any[] = filterResults.length === 0 ? users : filterResults;

  const firstPageIndex = (currentPage - 1) * rowsPerPage;
  const lastPageIndex = firstPageIndex + rowsPerPage;
  const currentTableData = results?.slice(firstPageIndex, lastPageIndex);

  const blockUser = (id: string, blocked: boolean) => {
    try {
      confirmAlert({
        text: blocked
          ? "This will unblock this user"
          : "This will block this user",
        confirmButtonText: blocked ? "Yes, unblock user" : "Yes, block user",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await usersService.blockUser({
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

  const headers = [
    { label: "CUSTOMER ID", key: "_id" },
    { label: "CREATED AT", key: "createdAt" },
    { label: "PROFILE", key: "profile" },
    { label: "FULLNAME", key: "fullname" },
    { label: "EMAIL", key: "email" },
    { label: "PHONE", key: "phone" },
  ];

  return (
    <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
      <PageHeader title="Customers" />
      <DetailsModal
        showModal={showModal}
        user={user}
        action={() => {
          setShowModal(false);
        }}
      />
      {/**filters */}
      <div className="flex flex-row gap-5 items-center justify-between">
        <div className="my-2 gap-2 flex sm:flex-row flex-col">
          <div className="flex gap-1 flex-col mb-1 sm:mb-0 sm:flex-row">
            <div className="w-1/2">
              <RowNumberSelector
                value={rowsPerPage}
                onChange={pageRowsHandler}
              />
            </div>
            <ValueFilterSelector
              setFilter={setCategory}
              value={category}
              options={["select", "name", "phone"]}
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
        <div>
          <CSVLink
            headers={headers}
            data={results}
            filename={"customers.csv"}
            className="py-2 px-1 bg-green-500  text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2"
          >
            <HiDownload />
            <span>{"Download Customers"}</span>
          </CSVLink>
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-lg overflow-hidden">
          <table className="min-w-full leading-normal font-segoe">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Date Created
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                  Phone
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
                <UsersTable
                  users={currentTableData}
                  blockUser={blockUser}
                  setShowModal={setShowModal}
                  setUser={setUser}
                />
              )}
            </tbody>
          </table>
          {/** Pagination */}
          <div className="my-7">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={users?.length}
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
