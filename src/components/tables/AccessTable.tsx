import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import Checkbox from "../buttons/Checkbox";

type AccessProps = {
  accessClick: Function;
  permissionClick: Function;
  checkedList?: any[];
  isSelectedAll: boolean;
  handleSelectAll: any;
};
const AccessTable = ({
  accessClick,
  permissionClick,
  checkedList,
  isSelectedAll,
  handleSelectAll,
}: AccessProps) => {
  return (
    <div>
      <h1 className="text-left text-lg">Access Tables</h1>
      <table className="border-separate border-spacing-2 border border-slate-400 w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 w-1/3 py-4">Menu</th>
            <th className="border border-slate-300 py-4 items-center">
              {/* <span className="float-left text-gray-400 text-sm font-thin">Select All<input type="checkbox" checked={isSelectedAll} onClick={handleSelectAll} className="ml-1 form-check-input border border-gray-300 bg-white h-4 w-4 rounded checked:bg-blue-200 transform duration-1000 bg-no-repeat bg-center bg-contain cursor-pointer align-middle focus:outline-none appearance-none "/></span> */}
              <span>Pages</span>
            </th>
            <th className="border border-slate-300 py-4">Permissions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Dashboard
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="1"
                  value="dashboard"
                  name="Index Page"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "1r" || id === "1w" || id === "1d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Index Page
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="1r"
                    value="read"
                    name="Index Page"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("1r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="1w"
                    value="write"
                    name="Index Page"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("1w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="1d"
                    value="delete"
                    name="Index Page"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("1d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Manage Admins
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="2"
                  value="manage-admins/new"
                  name="New Administrator"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "2r" || id === "2w" || id === "2d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  New Administrator
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="3"
                  value="manage-admins/all"
                  name="All Administrators"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "3r" || id === "3w" || id === "3d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  All Administrators
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="4"
                  value="manage-admins/roles"
                  name="Administrator Roles"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "4r" || id === "4w" || id === "4d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Administrator Roles
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="2r"
                    value="read"
                    name="New Administrator"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("2r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="2w"
                    value="write"
                    name="New Administrator"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("2w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="2d"
                    value="delete"
                    name="New Administrator"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("2d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="3r"
                    value="read"
                    name="All Administrators"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("3r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="3w"
                    value="write"
                    name="All Administrators"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("3w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="3d"
                    value="delete"
                    name="All Administrators"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("3d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="4r"
                    value="read"
                    name="Administrator Roles"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("4r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="4w"
                    value="write"
                    name="Administrator Roles"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("4w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="4d"
                    value="delete"
                    name="Administrator Roles"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("4d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Configurations
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="5"
                  value="configurations/charges"
                  name="Charges"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "5r" || id === "5w" || id === "5d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Charges
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="7"
                  value="configurations/customer-profile"
                  name="Customer Profile"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "7r" || id === "7w" || id === "7d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Customer Profile
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="5r"
                    value="read"
                    name="Charges"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("5r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="5w"
                    value="write"
                    name="Charges"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("5w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="5d"
                    value="delete"
                    name="Charges"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("5d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="7r"
                    value="read"
                    name="Customer Profile"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("7r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="7w"
                    value="write"
                    name="Customer Profile"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("7w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="7d"
                    value="delete"
                    name="Customer Profile"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("7d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Transactions
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="9"
                  value="transactions"
                  name="Transactions"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "9r" || id === "9w" || id === "9d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Transactions
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="30"
                  value="merchants"
                  name="Merchants"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "30r" || id === "30w" || id === "30d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Merchants
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="31"
                  value="customers"
                  name="Customers"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "31r" || id === "31w" || id === "31d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Customers
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="9r"
                    value="read"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("9r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="9w"
                    value="write"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("9w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="9d"
                    value="delete"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("9d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="30r"
                    value="read"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("30r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="30w"
                    value="write"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("30w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="30d"
                    value="delete"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("30d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="31r"
                    value="read"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("31r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="31w"
                    value="write"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("31w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="31d"
                    value="delete"
                    name="Transactions"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("31d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Customers
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="8"
                  value="users/all"
                  name="Users"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "8r" || id === "8w" || id === "8d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  All Customers
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="8r"
                    value="read"
                    name="Users"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("8r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="8w"
                    value="write"
                    name="Users"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("8w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="8d"
                    value="delete"
                    name="Users"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("8d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">Elevy</td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="10"
                  value="e-levy"
                  name="Elevy Records"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "10r" || id === "10w" || id === "10d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Elevy Records
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="10r"
                    value="read"
                    name="Elevy Records"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("10r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="10w"
                    value="write"
                    name="Elevy Records"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("10w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="10d"
                    value="delete"
                    name="Elevy Records"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("10d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Settlement
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="11"
                  value="merchant-settlement/new"
                  name="Initiate Settlement"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "11r" || id === "11w" || id === "11d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Initiate Settlement
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="12"
                  value="merchant-settlement/approvals"
                  name="Approvals"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "12r" || id === "12w" || id === "12d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Approvals
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="13"
                  value="merchant-settlement/all"
                  name="Settlements History"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "13r" || id === "13w" || id === "13d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Settlements History
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="11r"
                    value="read"
                    name="Initiate Settlement"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("11r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="11w"
                    value="write"
                    name="Initiate Settlement"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("11w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="11d"
                    value="delete"
                    name="Initiate Settlement"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("11d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="12r"
                    value="read"
                    name="Approvals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("12r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="12w"
                    value="write"
                    name="Approvals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("12w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="12d"
                    value="delete"
                    name="Approvals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("12d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="13r"
                    value="read"
                    name="Settlements History"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("13r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="13w"
                    value="write"
                    name="Settlements History"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("13w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="13d"
                    value="delete"
                    name="Settlements History"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("13d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Reversals
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="19"
                  value="reversals/pending"
                  name="Approve Reversals"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "19r" || id === "19w" || id === "19d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Approve Reversals
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="19r"
                    value="read"
                    name="Approve Reversals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("19r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="19w"
                    value="write"
                    name="Approve Reversals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("19w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="19d"
                    value="delete"
                    name="Approve Reversals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("19d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Direct Payout
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="21"
                  value="payout/initiate"
                  name="Payout Initiate"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "21r" || id === "21w" || id === "21d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Initiate Payouts
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="22"
                  value="payout/approvals"
                  name="Payout Approvals"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "22r" || id === "22w" || id === "22d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Approve Payouts
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="23"
                  value="payout/all"
                  name="Payout History"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "23r" || id === "23w" || id === "23d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  History
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="21r"
                    value="read"
                    name="Payout Initiate"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("21r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="21w"
                    value="write"
                    name="Payout Initiate"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("21w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="21d"
                    value="delete"
                    name="Payout Initiate"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("21d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="22r"
                    value="read"
                    name="Payout Approvals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("22r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="22w"
                    value="write"
                    name="Payout Approvals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("22w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="22d"
                    value="delete"
                    name="Payout Approvals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("22d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="23r"
                    value="read"
                    name="Payout History"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("23r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="23w"
                    value="write"
                    name="Payout History"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("23w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="23d"
                    value="delete"
                    name="Payout History"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("23d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Merchants
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="15"
                  value="merchants/all/onboarding"
                  name="Merchants Onboarding"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "15r" || id === "15w" || id === "15d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Merchants Onboarding
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="6"
                  value="merchants/all/approved"
                  name="Approved Merchants"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "6r" || id === "6w" || id === "6d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Approved Merchants
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="15r"
                    value="read"
                    name="Merchants Onboarding"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("15r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="15w"
                    value="write"
                    name="Merchants Onboarding"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("15w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="15d"
                    value="delete"
                    name="Merchants Onboarding"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("15d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="6r"
                    value="read"
                    name="Approved Merchants"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("6r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="6w"
                    value="write"
                    name="Approved Merchants"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("6w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="6d"
                    value="delete"
                    name="Approved Merchants"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("6d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">Wallets</td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="16"
                  value="wallets"
                  name="All Wallets"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "16r" || id === "16w" || id === "16d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  All Wallets
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="14"
                  value="direct-debit"
                  name="Direct Debit"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "14r" || id === "14w" || id === "14d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Direct Debit
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="20"
                  value="direct-credit"
                  name="Direct Credit"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "20r" || id === "20w" || id === "20d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Direct Credit
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="16r"
                    value="read"
                    name="All Wallets"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("16r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="16w"
                    value="write"
                    name="All Wallets"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("16w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="16d"
                    value="delete"
                    name="All Wallets"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("16d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="14r"
                    value="read"
                    name="Direct Debit"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("14r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="14w"
                    value="write"
                    name="Direct Debit"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("14w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="14d"
                    value="delete"
                    name="Direct Debit"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("14d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="20r"
                    value="read"
                    name="Direct Credit"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("20r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="20w"
                    value="write"
                    name="Direct Credit"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("20w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="20d"
                    value="delete"
                    name="Direct Credit"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("20d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">Referals</td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="17"
                  value="referrals"
                  name="Referrals"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "17r" || id === "17w" || id === "17d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Referrals
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="17r"
                    value="read"
                    name="Referrals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("17r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="17w"
                    value="write"
                    name="Referrals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("17w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="17d"
                    value="delete"
                    name="Referrals"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("17d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Broadcast Message
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="18"
                  value="sms-broadcast"
                  name="Sms Broadcast"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some(
                      (id) => id === "18r" || id === "18w" || id === "18d"
                    )
                  }
                />
                <label className="form-check-label inline-block ">
                  Sms Broadcast
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="18r"
                    value="read"
                    name="Sms Broadcast"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("18r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
                <div>
                  <Checkbox
                    id="18w"
                    value="write"
                    name="Sms Broadcast"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("18w")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Write
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="18d"
                    value="delete"
                    name="Sms Broadcast"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("18d")
                    }
                  />
                  <label className="form-check-label inline-block ">
                    Delete
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 text-left py-4">
              Statiscal Reports
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check">
                <Checkbox
                  id="25"
                  value="reports/customers"
                  name="Customers Report"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some((id) => id === "25r")
                  }
                />
                <label className="form-check-label inline-block ">
                  Customers Report
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="26"
                  value="reports/sales"
                  name="Sales Report"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some((id) => id === "26r")
                  }
                />
                <label className="form-check-label inline-block ">
                  Sales Report
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="27"
                  value="reports/transactions"
                  name="Transactions Report"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some((id) => id === "27r")
                  }
                />
                <label className="form-check-label inline-block ">
                  Transactions Report
                </label>
              </div>
              <div className="form-check">
                <Checkbox
                  id="28"
                  value="reports/fraud"
                  name="Fraud Report"
                  click={accessClick}
                  isChecked={
                    Array.isArray(checkedList) &&
                    checkedList.some((id) => id === "28r")
                  }
                />
                <label className="form-check-label inline-block ">
                  Fraud Report
                </label>
              </div>
            </td>
            <td className="border border-slate-300 text-left py-4">
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="25r"
                    value="read"
                    name="Customers Report"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("25r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="26r"
                    value="read"
                    name="Sales Report"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("26r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="27r"
                    value="read"
                    name="Transactions Report"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("27r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
              </div>
              <div className="form-check flex space-x-5">
                <div>
                  <Checkbox
                    id="28r"
                    value="read"
                    name="Fraud Report"
                    click={permissionClick}
                    isChecked={
                      Array.isArray(checkedList) && checkedList.includes("28r")
                    }
                  />
                  <label className="form-check-label inline-block ">Read</label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default AccessTable;
