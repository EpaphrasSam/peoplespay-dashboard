import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import RolesTable from "../../tables/RolesTable";
import authService from "../../../services/auth.service";
import Spinner from "../layout/Spinner";
import SearchForm from "../../forms/SearchForm";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, setSelectedRole } from "../../../state/auth.state";
import { PrimaryButton } from "../../buttons/BasicButton";
import { AiOutlinePlus } from "react-icons/ai";
import useFetchRoles from "./useFetchRoles";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import PageHeader from "../../header/PageHeader";
import { alertResponse, confirmAlert } from "../../sweetalert/SweetAlert";
import Pagination from "../../pagination/Pagination";

function AllAdmins() {
  useFetchRoles();
  const dispatch = useDispatch();
  const { roles, loading } = useSelector(authSelector);
  let navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const goToEdit = (role: any) => {
    dispatch(setSelectedRole(role));
    return navigate("/manage-admins/roles/edit");
  };

  const deactivateRole = async (id: string, isActive: boolean) => {
    try {
      confirmAlert({
        text: isActive
          ? "This will disable this role"
          : "This will enable this role",
        confirmButtonText: isActive ? "Yes, disable" : "Yes enable",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await authService.updateRole({
            id: id,
            data: {
              active: !isActive,
            },
          });
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

  const filterResults = roles?.filter((r: any) => {
    const hasSearchResults: boolean = r?.name
      ?.toLowerCase()
      .startsWith(searchQuery.toLowerCase());
    if (hasSearchResults) return r;
  });

  const results: any[] = filterResults?.length === 0 ? roles : filterResults;

  const firstPageIndex = (currentPage - 1) * rowsPerPage;
  const lastPageIndex = firstPageIndex + rowsPerPage;
  const currentTableData = results?.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
      {/**page heading */}

      <PageHeader title="Roles" />

      <div className="flex flex-col md:flex-row md:justify-between">
        {/**filters */}
        <div className="my-2 gap-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler} />
          </div>
          <SearchForm
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search role name"
          />
        </div>
        <div>
          <PrimaryButton
            value="Add Role"
            color="blue"
            icon={<AiOutlinePlus />}
            action={() => {
              navigate("new");
            }}
          />
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
        <div className="inline-block min-w-full shadow-lg overflow-hidden">
          <table className="overflow-x-scroll min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                  Date Created
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                  Role Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Description
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
              {loading ? (
                <Spinner />
              ) : (
                <RolesTable
                  data={currentTableData}
                  onEditClick={goToEdit}
                  deactivateRole={deactivateRole}
                />
              )}
            </tbody>
          </table>
          {/** Pagination */}
          <div className="my-7">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={roles?.length}
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
