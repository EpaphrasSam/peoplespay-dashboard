interface AppProps {
  transactions: any[];
  addId: Function;
  reverseIds: any[];
  checked: boolean;
  setShowModal: any;
  setTransaction: any;
}

const UserTransactionsTable = ({
  setTransaction,
  setShowModal,
  transactions,
  addId,
  reverseIds,
  checked,
}: AppProps): JSX.Element => (
  <>
    {transactions.length > 0 ? (
      transactions.map((t) => (
        <tr className="cursor-pointer hover:bg-green-100 click:bg-green-200">
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <p className="text-gray-900 whitespace-no-wrap">
              {t.createdAt} <br />
              {t.time}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {t.description}
                </p>
              </div>
            </div>
          </td>
          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">{t.time}</span>
            </span>
          </td> */}
          <td className="px-5 py-5 border-b border-gray-200 bg-white  text-left">
            <p className="text-gray-900 whitespace-no-wrap uppercase">
              {t.customerName}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <p className="text-gray-900 whitespace-no-wrap uppercase">
              {t.recipientName}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <p className="text-gray-900 whitespace-no-wrap">{t.amount}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <p className="text-gray-900 whitespace-no-wrap">{t.charges}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            <p className="text-gray-900 whitespace-no-wrap">
              GHS{t.elevyCharges}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            {t.debit_status === "paid" ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-sgreen rounded-md"
                ></span>
                <span className="relative">Paid</span>
              </span>
            ) : t.debit_status === "failed" ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-red-500 rounded-md"
                ></span>
                <span className="relative">Failed</span>
              </span>
            ) : (
              <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gray-200 opacity-50 rounded-md"
                ></span>
                <span className="relative uppercase">{t.debit_status}</span>
              </span>
            )}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-left">
            {t.status === "PAID" ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-sgreen rounded-md"
                ></span>
                <span className="relative">Paid</span>
              </span>
            ) : t.status === "FAILED" ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-red-500 rounded-md"
                ></span>
                <span className="relative">Failed</span>
              </span>
            ) : (
              <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-yellow-200 rounded-md"
                ></span>
                <span className="relative">Authorization Pending</span>
              </span>
            )}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white   border-t-0 border-l-0 border-r-0">
            <p className="text-gray-900 whitespace-no-wrap text-left">
              {t.payment_account_type === "momo" ? (
                <>
                  <i className="fas fa-circle text-yellow-300 mr-2"></i>
                  Momo
                </>
              ) : t.payment_account_type === "wallet" ? (
                <>
                  <i className="fas fa-circle text-indigo-500 mr-2"></i>
                  Wallet
                </>
              ) : t.payment_account_type === "provider" ? (
                <>
                  <i className="fas fa-circle text-pink mr-2"></i>
                  Provider
                </>
              ) : (
                <>
                  <i className="fas fa-circle text-green-500 mr-2"></i>
                  Card
                </>
              )}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              disabled={
                checked && reverseIds?.includes(t._id) === false ? true : false
              }
              onClick={() => addId(t._id)}
            />
            <i
              className="far fa-eye"
              onClick={() => {
                setShowModal(true);
                setTransaction(t);
              }}
            />
          </td>
        </tr>
      ))
    ) : (
      <div className="text-center uppercase fixed">
        No transactions to display
      </div>
    )}
  </>
);
export default UserTransactionsTable;
