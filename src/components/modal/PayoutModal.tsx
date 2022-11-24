import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";
import { formatDate } from "../../utils/Date";

type ModalProps = {
  showModal: boolean;
  transaction: any;
  approve: Function;
  decline: Function;
  cancel: Function;
};

interface UserInfoProps {
  title: string;
  value: any;
}
export const TransactionInfo = ({ title, value }: UserInfoProps) => (
  <div>
    <label className="text-gray-400 break-all">{title}</label>
    <div className="break-all">{value}</div>
  </div>
);

const Modal = ({
  showModal,
  transaction,
  approve,
  decline,
  cancel,
}: ModalProps) => (
  <>
    {showModal && (
      <div
        className="relative z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:min-w-sm w-2/3">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h4 className="underline pb-3 text-pink">
                  Transaction Details
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <TransactionInfo
                    title="Transaction Id"
                    value={transaction?._id}
                  />
                  <TransactionInfo
                    title="Date Initiated"
                    value={formatDate(transaction.createdAt)}
                  />
                  <TransactionInfo
                    title="Description"
                    value={transaction?.description}
                  />
                  <TransactionInfo title="Amount" value={transaction?.amount} />
                  <TransactionInfo
                    title="Recipient Account Type"
                    value={transaction?.recipient_account_type}
                  />
                  <TransactionInfo
                    title="Recipient Account Name"
                    value={transaction?.recipient_account_name}
                  />
                  <TransactionInfo
                    title="Recipient Account Number"
                    value={transaction?.recipient_account_number}
                  />
                  <TransactionInfo
                    title="Payment Account Name"
                    value={transaction?.payment_account_name}
                  />
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row space-x-3 float-right">
                <button
                  type="button"
                  className="w-full inline-flex items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => approve()}
                >
                  <FaRegThumbsUp className="mr-1 text-white" />
                  Approve
                </button>
                <button
                  type="button"
                  className="w-full inline-flex items-center rounded-md border border-red-500 shadow-sm px-4 py-2 text-base font-medium text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => decline()}
                >
                  <FaThumbsDown className="mr-1 text-red" />
                  Decline
                </button>
                <button
                  type="button"
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => cancel()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
export default Modal;
