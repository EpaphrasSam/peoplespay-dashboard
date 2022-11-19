import { useEffect, useState, ChangeEvent } from "react";
import PageHeader from "../../header/PageHeader";
import SearchForm from "../../forms/SearchForm";
import RowNumberSelector from "../../buttons/RowNumberSelector";
import merchantsService from "../../../services/merchant.service";
import { PrimaryButton } from "../../buttons/BasicButton";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { confirmAlert, alertResponse } from "../../sweetalert/SweetAlert";
import Pagination from "../../pagination/Pagination";

function AllUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [users, setusers] = useState([]);
  const location = useLocation();
  const id = location.state;
  const admins: any = sessionStorage.getItem("PP-USER");
  const ad = JSON.parse(admins);
  const admin = ad._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    merchantId: id,
    permissions: ["manage_users"],
  });

  const pageRowsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      confirmAlert({
        text: "This will add the user",
        confirmButtonText: "Yes, add",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await merchantsService.addUser(formData);
          if (!res.success) {
            return alertResponse({
              icon: "info",
              response: res.message,
            });
          }
          setshowModal(false);
          await alertResponse({
            icon: "success",
            response: res.message,
          });
          return window.location.reload();
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };

  useEffect(() => {
    const getUsers: Function = async (id: string) => {
      try {
        setisLoading(true);
        const response = await merchantsService.getUsers(id);
        if (!response.success) {
          setisLoading(false);
          return alert(response.message);
        } else {
          setusers(response.data);
          setisLoading(false);
        }
      } catch (err: any) {
        alert(err);
        setisLoading(false);
      }
    };
    getUsers(id);
  }, []);

  const resetPassword: Function = async (merchantId: string) => {
    try {
      confirmAlert({
        text: "This will reset the password for this user",
        confirmButtonText: "Yes, reset",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            admin: admin,
            merchantId: id,
            userMerchant: merchantId,
          };
          const res = await merchantsService.resetUser(data);
          if (!res.success) {
            return alertResponse({
              icon: "info",
              response: res.message,
            });
          }
          await alertResponse({
            icon: "success",
            response: res.message,
          });
          return window.location.reload();
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };

  const filterResults = users?.filter((r: any) => {
    const hasSearchResults: boolean = r?.name
      ?.toLowerCase()
      .startsWith(searchQuery.toLowerCase());
    if (hasSearchResults) return r;
  });

  const results: any[] = filterResults.length === 0 ? users : filterResults;

  const firstPageIndex = (currentPage - 1) * rowsPerPage;
  const lastPageIndex = firstPageIndex + rowsPerPage;

  const currentTableData = results?.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="relative md:pt-10 pb-10  w-full mb-12">
      <>
        {showModal && (
          <div
            className="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={() => setshowModal(false)}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            ></div>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:min-w-sm w-1/2">
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h4 className="text-center pb-3 text-pink">New User</h4>
                      <label className="block mt-4 text-sm text-left">
                        Name
                      </label>
                      <input
                        className="w-full px-4 py-2 text-sm border border-gray-500 rounded focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-gray-200"
                        placeholder="Enter Name"
                        type="text"
                        name="name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <label className="block mt-4 text-sm text-left">
                        Email
                      </label>
                      <input
                        className="w-full px-4 py-2 text-sm border border-gray-500 rounded focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-gray-200"
                        placeholder="Enter Email"
                        type="email"
                        name="email"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                      <label className="block mt-4 text-sm text-left">
                        Phone Number
                      </label>
                      <input
                        className="w-full px-4 py-2 text-sm border border-gray-500 rounded focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-gray-200"
                        placeholder="Enter Phone Number"
                        type="number"
                        name="phone"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row space-x-3 float-right">
                      <button
                        className="inline-flex items-center py-1.5 px-4 bg-blue-500 text-white rounded hover:shadow outline focus:outline-none ease-linear transition-all duration-150 hover:bg-blue-600 tracking-wide font-inter border border-blue-400 space-x-2"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        className="inline-flex items-center py-1.5 px-4 bg-gray-500 text-white rounded hover:shadow outline focus:outline-none ease-linear transition-all duration-150 hover:bg-gray-600 tracking-wide font-inter border border-gray-400 space-x-2"
                        onClick={() => setshowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <PageHeader title="Merchant's Users" />

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="my-2 gap-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <RowNumberSelector onChange={pageRowsHandler} value={rowsPerPage} />
          </div>
          <SearchForm
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value.trim())
            }
            placeholder="Search All Users"
          />
        </div>
        <div>
          <PrimaryButton
            value="New User"
            color="blue"
            icon={<AiOutlinePlus />}
            action={() => {
              setshowModal(true);
            }}
          />
        </div>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
        <div className="inline-block min-w-full shadow-lg overflow-hidden">
          {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg text-blueGray-700">
              ALL USERS
            </h3>
          </div> */}
          <table className="overflow-x-scroll min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Account Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                  Password Reset
                </th>
              </tr>
            </thead>
            <tbody className="text-md">
              {isLoading ? (
                <Spinner />
              ) : (
                Array.isArray(currentTableData) &&
                currentTableData.map((s: any) => (
                  <tr className="cursor-pointer">
                    <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 capitalize whitespace-no-wrap">
                        {s.name}
                      </p>
                    </td>
                    <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {s.email}
                      </p>
                    </td>
                    <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {s.phone}
                      </p>
                    </td>
                    <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {s.permissions.includes("manage_users") ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-sgreen rounded-md"
                            ></span>
                            <span className="relative">Admin</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-gray-500 rounded-md"
                            ></span>
                            <span className="relative">Normal</span>
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <PrimaryButton
                        value="RESET"
                        color="red"
                        action={() => {
                          resetPassword(s._id);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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

export default AllUsers;
