import { useEffect, useState, ChangeEvent } from "react";
import AdminsTable from "../../tables/AdminsTable";
import authService from "../../../services/auth.service";
import Spinner from "../layout/Spinner";
import SearchForm from "../../forms/SearchForm";
import PageHeader from "../../header/PageHeader";
import {
  authSelector,
  setAdmins,
  setSelectedAdmin,
} from "../../../state/auth.state";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import Pagination from "../../pagination/Pagination";

function AllAdmins() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admins } = useSelector(authSelector);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    try {
      setIsLoading(true);
      const res = await authService.getAllAdmins();
      if (!res.success) {
        setIsLoading(false);
        return alert(res.message);
      }
      dispatch(setAdmins(res.data));
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  const editAdmin = async (id: string) => {
    try {
      const admin = admins.filter((admin) => admin._id === id);
      dispatch(setSelectedAdmin(admin[0]));
      navigate("/manage-admins/edit");
    } catch (err) {}
  };

  const resetPassword = (id: string) => {
    try {
      confirmAlert({
        text: "This will reset the password for this admin",
        confirmButtonText: "Yes, reset",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await authService.resetPassword(id);
          if (!res.success) {
            return alertResponse({
              icon: "info",
              response: res.message,
            });
          }
          return alert(res.message);
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };

  const blockAdmin = (id: string, isblocked: boolean) => {
    try {
      confirmAlert({
        text: isblocked
          ? "This will unblock this merchant"
          : "This will block this merchant",
        confirmButtonText: isblocked
          ? "Yes, unblock this admin user"
          : "Yes, block admin user",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            id: id,
            data: {
              blocked: isblocked ? false : true,
            },
          };
          const res = await authService.update(data);
          await alertResponse({
            icon: res?.success ? "success" : "error",
            response: res.message,
          });
          if (res.success) return window.location.reload();
        }
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const filterResults = admins?.filter((r: any) => {
    const hasSearchResults: boolean = r?.name
      ?.toLowerCase()
      .startsWith(searchQuery.toLowerCase());
    if (hasSearchResults) return r;
  });

  const results: any[] = filterResults.length === 0 ? admins : filterResults;

  const firstPageIndex = (currentPage - 1) * rowsPerPage;
  const lastPageIndex = firstPageIndex + rowsPerPage;

  const currentTableData = results?.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
      {/**page heading */}

      <PageHeader title="Administrators" />

      {/**filters */}
      <div className="my-2 gap-2 flex sm:flex-row flex-col">
        <div className="flex flex-row mb-1 sm:mb-0">
          <RowNumberSelector onChange={pageRowsHandler} value={rowsPerPage} />
        </div>
        <SearchForm
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search name"
        />
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
        <div className="inline-block min-w-full shadow-lg overflow-hidden">
          <table className="overflow-x-scroll min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Account Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-md">
              {isLoading ? (
                <Spinner />
              ) : (
                <AdminsTable
                  data={currentTableData}
                  resetPassword={resetPassword}
                  blockAdmin={blockAdmin}
                  editAdmin={editAdmin}
                />
              )}
            </tbody>
          </table>
          <div className="my-7">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={admins?.length}
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
export default AllAdmins;
