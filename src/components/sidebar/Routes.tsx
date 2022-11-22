import {
  BsHouse,
  BsClockHistory,
  BsWallet2,
  BsKey,
  BsBoxArrowInLeft,
} from "react-icons/bs";
import { FiUsers, FiUserPlus, FiUserCheck } from "react-icons/fi";
import {
  VscSettings,
  VscArrowSwap,
  VscFileSymlinkDirectory,
} from "react-icons/vsc";
//import {GrUserAdmin} from 'react-icons/gr'
import { GiPayMoney, GiReceiveMoney, GiSpeaker } from "react-icons/gi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { RiShareForwardLine, RiApps2Line, RiPaypalFill } from "react-icons/ri";
import { SiPayoneer, SiWebmoney } from "react-icons/si";
import { TbHammer } from "react-icons/tb";
import { MdOutlineSkateboarding } from "react-icons/md";
import { AiOutlineBarChart, AiOutlineDashboard } from "react-icons/ai";

export interface Route {
  path: string;
  title: string;
  icon: any;
  hasChild?: boolean;
  children?: Array<Route>;
}

const routes: Route[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: <BsHouse className="mr-3 text-xl" />,
    hasChild: false,
    children: [],
  },
  {
    path: "manage-admins",
    title: "Manage Admins",
    icon: <FiUserCheck className="mr-3 text-xl" />,
    hasChild: true,
    children: [
      {
        path: "create-admin",
        icon: <FiUserPlus className="mr-3 text-xl" />,
        title: "Create Admin",
      },
      {
        path: "all-admins",
        icon: <FiUsers className="mr-3 text-xl" />,
        title: "All admins",
      },
      {
        path: "roles",
        icon: <BsKey className="mr-3 text-xl" />,
        title: "Admin Roles",
      },
    ],
  },
  {
    path: "configurations",
    title: "Configurations",
    icon: <VscSettings className="mr-3 text-xl" />,
    hasChild: true,
    children: [
      {
        path: "customer-profile",
        icon: <FiUsers className="mr-3 text-xl" />,
        title: "Customer Profile",
      },
      {
        path: "charges-control",
        icon: <TbHammer className="mr-3 text-xl" />,
        title: "Charges",
      },
      {
        path: "merchants-control",
        icon: <RiApps2Line className="mr-3 text-xl" />,
        title: "Merchants Apps",
      },
    ],
  },
  {
    path: "users",
    title: "Users",
    icon: <FiUsers className="mr-3 text-xl" />,
    hasChild: true,
    children: [
      {
        path: "user-transactions",
        icon: <GiPayMoney className="mr-3 text-xl" />,
        title: "User Transactions",
      },
      {
        path: "users",
        icon: <FiUsers className="mr-3 text-xl" />,
        title: "Subscribers",
      },
    ],
  },
  {
    path: "e-levy",
    title: "E-Levy",
    icon: <FaRegMoneyBillAlt className="mr-3 text-xl" />,
    hasChild: false,
    children: [],
  },
  {
    path: "merchant-settlement/new",
    title: "Settlement",
    icon: <SiWebmoney className="mr-3 text-xl" />,
    hasChild: true,
    children: [
      {
        path: "merchant-settlement/new",
        icon: <GiReceiveMoney className="mr-3 text-xl" />,
        title: "Initiate",
      },
      {
        path: "merchant-settlement/approvals",
        icon: <VscArrowSwap className="mr-3 text-xl" />,
        title: "Approvals",
      },
      {
        path: "merchant-settlement/all",
        icon: <BsClockHistory className="mr-3 text-xl" />,
        title: "History",
      },
    ],
  },
  {
    path: "direct-debit",
    title: "Direct Debit",
    icon: <VscFileSymlinkDirectory className="mr-3 text-xl" />,
    hasChild: false,
    children: [],
  },
  {
    path: "merchants",
    title: "Merchants",
    icon: <FiUsers className="mr-3 text-xl" />,
    hasChild: true,
    children: [
      {
        path: "merchants",
        icon: <MdOutlineSkateboarding className="mr-3 text-2xl" />,
        title: "Merchants Onboarding",
      },
      {
        path: "merchant-transactions",
        icon: <GiPayMoney className="mr-3 text-xl" />,
        title: "Transactions",
      },
      {
        path: "merchant-categories",
        icon: <BiCategory className="mr-3 text-xl" />,
        title: "Categories",
      },
    ],
  },
  {
    path: "wallets",
    title: "Wallets",
    icon: <BsWallet2 className="mr-3 text-xl" />,
    hasChild: false,
    children: [],
  },
  // {
  //     path:'agents',
  //     title:'Agents',
  //     icon:<FiUsers className="mr-3 text-xl"/>,
  //     hasChild : false,
  //     children:[]
  // },
  {
    path: "referrals",
    title: "Referrals",
    icon: <RiShareForwardLine className="mr-3 text-xl" />,
    hasChild: false,
    children: [],
  },
  {
    path: "broadcast-message",
    title: "Sms Broadcast",
    icon: <GiSpeaker className="mr-3 text-xl" />,
    hasChild: false,
    children: [],
  },
];

const roles: Route[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: <AiOutlineDashboard className="mr-3 text-xl text-pink" />,
    hasChild: false,
    children: [],
  },
  {
    path: "manage-admins",
    title: "Manage Admins",
    icon: <FiUserCheck className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "manage-admins/new",
        icon: <FiUserPlus className="mr-3 text-xl" />,
        title: "Create Admin",
      },
      {
        path: "manage-admins/all",
        icon: <FiUsers className="mr-3 text-xl" />,
        title: "All admins",
      },
      {
        path: "manage-admins/roles",
        icon: <BsKey className="mr-3 text-xl" />,
        title: "Admin Roles",
      },
    ],
  },
  {
    path: "configurations",
    title: "Configurations",
    icon: <VscSettings className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "configurations/customer-profile",
        icon: <FiUsers className="mr-3 text-xl" />,
        title: "Customer Profile",
      },
      {
        path: "configurations/charges",
        icon: <TbHammer className="mr-3 text-xl" />,
        title: "Charges",
      },
    ],
  },
  {
    path: "transactions",
    title: "Transactions",
    icon: <GiPayMoney className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "transactions",
        icon: <GiPayMoney className="mr-3 text-xl" />,
        title: "Transactions",
      },
      {
        path: "merchants",
        icon: <GiPayMoney className="mr-3 text-xl" />,
        title: "Merchants",
      },
      {
        path: "customers",
        icon: <GiPayMoney className="mr-3 text-xl" />,
        title: "Customers",
      },
    ],
  },
  {
    path: "users",
    title: "Customers",
    icon: <FiUsers className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "users/all",
        icon: <FiUsers className="mr-3 text-xl" />,
        title: "Customers",
      },
    ],
  },
  {
    path: "merchants",
    title: "Merchants",
    icon: <FiUsers className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "merchants/all/onboarding",
        icon: <MdOutlineSkateboarding className="mr-3 text-2xl" />,
        title: "Merchants Onboarding",
      },
      {
        path: "merchants/all/approved",
        icon: <RiApps2Line className="mr-3 text-xl" />,
        title: "Approved Merchants",
      },
      {
        path: "merchants/transactions",
        icon: <GiPayMoney className="mr-3 text-xl" />,
        title: "Transactions",
      },
      {
        path: "merchants/categories",
        icon: <BiCategory className="mr-3 text-xl" />,
        title: "Categories",
      },
    ],
  },
  {
    path: "e-levy",
    title: "E-Levy",
    icon: <FaRegMoneyBillAlt className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "e-levy",
        icon: <FaRegMoneyBillAlt className="mr-3 text-xl" />,
        title: "E-Levy",
      },
    ],
  },
  {
    path: "merchant-settlement",
    title: "Settlement",
    icon: <SiWebmoney className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "merchant-settlement/new",
        icon: <GiReceiveMoney className="mr-3 text-xl" />,
        title: "Initiate",
      },
      {
        path: "merchant-settlement/approvals",
        icon: <VscArrowSwap className="mr-3 text-xl" />,
        title: "Approvals",
      },
      {
        path: "merchant-settlement/all",
        icon: <BsClockHistory className="mr-3 text-xl" />,
        title: "History",
      },
    ],
  },
  {
    path: "wallets",
    title: "Wallets",
    icon: <BsWallet2 className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "wallets",
        title: "All Wallets",
        icon: <BsWallet2 className="mr-3 text-xl" />,
      },
      {
        path: "direct-debit",
        title: "Direct Debit",
        icon: <VscFileSymlinkDirectory className="mr-3 text-xl" />,
      },
      {
        path: "direct-credit",
        title: "Direct Credit",
        icon: <VscFileSymlinkDirectory className="mr-3 text-xl" />,
      },
    ],
  },
  {
    path: "direct-payout",
    title: "Direct Payout",
    icon: <RiPaypalFill className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "payout/initiate",
        title: "Direct Payout",
        icon: <SiPayoneer className="mr-3 text-xl" />,
      },
      {
        path: "payout/approvals",
        title: "Approvals",
        icon: <VscArrowSwap className="mr-3 text-xl" />,
      },
      {
        path: "payout/all",
        title: "History",
        icon: <BsClockHistory className="mr-3 text-xl" />,
      },
    ],
  },
  {
    path: "reversals",
    title: "Reversals",
    icon: (
      <BsBoxArrowInLeft className="mr-3 text-xl hover:text-pink text-pink" />
    ),
    hasChild: true,
    children: [
      {
        path: "reversals/pending",
        title: "Reversals",
        icon: <BsBoxArrowInLeft className="mr-3 text-xl" />,
      },
    ],
  },

  // {
  //     path:'agents',
  //     title:'Agents',
  //     icon:<FiUsers className="mr-3 text-xl"/>,
  //     hasChild : false,
  //     children:[]
  // },
  {
    path: "referrals",
    title: "Referrals",
    icon: <RiShareForwardLine className="mr-3 text-xl text-pink" />,
    hasChild: false,
    children: [],
  },
  {
    path: "sms-broadcast",
    title: "Sms Broadcast",
    icon: <GiSpeaker className="mr-3 text-xl text-pink" />,
    hasChild: false,
    children: [],
  },
  {
    path: "reports",
    title: "Reports",
    icon: <AiOutlineBarChart className="mr-3 text-xl text-pink" />,
    hasChild: true,
    children: [
      {
        path: "reports/customers",
        title: "Customers Report",
        icon: <AiOutlineBarChart className="mr-3 text-xl" />,
      },
      {
        path: "reports/sales",
        title: "Sales Report",
        icon: <AiOutlineBarChart className="mr-3 text-xl" />,
      },
      {
        path: "reports/transactions",
        title: "Transactions Report",
        icon: <AiOutlineBarChart className="mr-3 text-xl" />,
      },
      {
        path: "reports/fraud",
        title: "Fraud Report",
        icon: <AiOutlineBarChart className="mr-3 text-xl" />,
      },
    ],
  },
];

const access = {
  routes,
  roles,
};
export default access;
