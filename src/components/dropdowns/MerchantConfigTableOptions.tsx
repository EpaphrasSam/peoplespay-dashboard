import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdReadMore } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { FaRegEyeSlash, FaUser } from "react-icons/fa";
//import {GrPowerReset} from 'react-icons/gr'
import { IoIosApps } from "react-icons/io";

type OptionProps = {
  blockMerchant?: () => void;
  isBlocked?: boolean;
  seeApps?: () => void;
  seeDetails?: () => void;
  viewUsers?: () => void;
  approvedDetails?: () => void;
  show?: boolean;
};

export default function MerchantConfigTableOptions({
  approvedDetails,
  seeDetails,
  seeApps,
  blockMerchant,
  isBlocked,
  viewUsers,
  show = true,
}: OptionProps) {
  return (
    <div className="text-right">
      <Menu as="div" className="text-left">
        <div>
          <Menu.Button className="inline-flex justify-center tracking-wide font-segoe bg-indigo-50 text-indigo-500 active:bg-indigo-600 hover:bg-indigo-200 text-md font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            Options
            <FiChevronDown
              className="-mr-1  h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-blue-500" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={approvedDetails}
                  >
                    <MdReadMore className="mr-2 h-5 w-5" aria-hidden="true" />
                    See Details
                  </button>
                )}
              </Menu.Item>
              {show && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-blue-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={seeDetails}
                    >
                      <AiFillEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                      Edit Details
                    </button>
                  )}
                </Menu.Item>
              )}
              {show && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-blue-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={seeApps}
                    >
                      <IoIosApps className="mr-2 h-5 w-5" aria-hidden="true" />
                      See Apps
                    </button>
                  )}
                </Menu.Item>
              )}
              {show && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-blue-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={blockMerchant}
                    >
                      <FaRegEyeSlash
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      {isBlocked ? "Unblock" : "Block Merchant"}
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-blue-500" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={viewUsers}
                  >
                    <FaUser className="mr-2 h-5 w-5" aria-hidden="true" />
                    View Users
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
