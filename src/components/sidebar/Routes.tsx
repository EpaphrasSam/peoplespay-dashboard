import {BsHouse,BsClockHistory,BsWallet2,BsKey} from 'react-icons/bs'
import {FiUsers,FiUserPlus,FiUserCheck} from 'react-icons/fi'
import {VscSettings,VscArrowSwap,VscFileSymlinkDirectory} from 'react-icons/vsc'
//import {GrUserAdmin} from 'react-icons/gr'
import {GiPayMoney,GiReceiveMoney,GiSpeaker} from 'react-icons/gi'
import {FaRegMoneyBillAlt}from 'react-icons/fa'
import {BiCategory} from 'react-icons/bi'
import {RiShareForwardLine,RiApps2Line}from 'react-icons/ri'
import {SiWebmoney}from 'react-icons/si'
import{TbHammer}from 'react-icons/tb'
import { MdOutlineSkateboarding } from "react-icons/md";



export interface Route {
    path:string;
    title:string;
    icon:any;
    hasChild? :boolean;
    children?:Array<Route>
}

const routes:Route[]=[
    {
        path:'/',
        title:'Dashboard',
        icon:<BsHouse className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'manage-admins',
        title:'Manage Admins',
        icon:<FiUserCheck className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'create-admin',
                icon:<FiUserPlus className="mr-3 text-xl"/>,
                title:'Create Admin'
            },
            {
                path:'all-admins',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'All admins'
            },
            {
                path:'roles',
                icon:<BsKey className="mr-3 text-xl"/>,
                title:'Admin Roles'
            }
        ]
    },
    {
        path:'configurations',
        title:'Configurations',
        icon:<VscSettings className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'customer-profile',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'Customer Profile'
            },
            {
                path:'charges-control',
                icon:<TbHammer className="mr-3 text-xl"/>,
                title:'Charges'
            },
            {
                path:'merchants-control',
                icon:<RiApps2Line className="mr-3 text-xl"/>,
                title:'Merchants Apps'
            }
        ]
    },
    {
        path:'users',
        title:'Users',
        icon:<FiUsers className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'user-transactions',
                icon:<GiPayMoney className="mr-3 text-xl"/>,
                title:'User Transactions'
            },
            {
                path:'users',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'Subscribers'
            }
        ]
    },
    {
        path:'e-levy',
        title:'E-Levy',
        icon:<FaRegMoneyBillAlt className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'merchant-settlement/new',
        title:'Settlement',
        icon:<SiWebmoney className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'merchant-settlement/new',
                icon:<GiReceiveMoney className="mr-3 text-xl"/>,
                title:'Initiate'
            },
            {
                path:'merchant-settlement/approvals',
                icon:<VscArrowSwap className="mr-3 text-xl"/>,
                title:'Approvals'
            },
            {
                path:'merchant-settlement/all',
                icon:<BsClockHistory className="mr-3 text-xl"/>,
                title:'History'
            }
            
        ]
    },
    {
        path:'direct-debit',
        title:'Direct Debit',
        icon:<VscFileSymlinkDirectory className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'merchants',
        title:'Merchants',
        icon:<FiUsers className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'merchants',
                icon:<MdOutlineSkateboarding className="mr-3 text-2xl"/>,
                title:'Merchants Onboarding'
            },
            {
                path:'merchant-transactions',
                icon:<GiPayMoney className="mr-3 text-xl"/>,
                title:'Transactions'
            },
            {
                path:'merchant-categories',
                icon:<BiCategory className="mr-3 text-xl"/>,
                title:'Categories'
            },
        ]
    },
    {
        path:'wallets',
        title:'Wallets',
        icon:<BsWallet2 className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    // {
    //     path:'agents',
    //     title:'Agents',
    //     icon:<FiUsers className="mr-3 text-xl"/>,
    //     hasChild : false,
    //     children:[]
    // },
    {
        path:'referrals',
        title:'Referrals',
        icon:<RiShareForwardLine className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'broadcast-message',
        title:'Sms Broadcast',
        icon:<GiSpeaker className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
];

const roles:Route[]=[
    {
        path:'dashboard',
        title:'Dashboard',
        icon:<BsHouse className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'manage-admins',
        title:'Manage Admins',
        icon:<FiUserCheck className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'manage-admins/new',
                icon:<FiUserPlus className="mr-3 text-xl"/>,
                title:'Create Admin'
            },
            {
                path:'manage-admins/all',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'All admins'
            },
            {
                path:'manage-admins/roles',
                icon:<BsKey className="mr-3 text-xl"/>,
                title:'Admin Roles'
            }
        ]
    },
    {
        path:'configurations',
        title:'Configurations',
        icon:<VscSettings className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'configurations/customer-profile',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'Customer Profile'
            },
            {
                path:'configurations/charges',
                icon:<TbHammer className="mr-3 text-xl"/>,
                title:'Charges'
            },
            {
                path:'configurations/merchants',
                icon:<RiApps2Line className="mr-3 text-xl"/>,
                title:'Merchants Apps'
            }
        ]
    },
    {
        path:'users',
        title:'Users',
        icon:<FiUsers className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'users/transactions',
                icon:<GiPayMoney className="mr-3 text-xl"/>,
                title:'User Transactions'
            },
            {
                path:'users/all',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'Subscribers'
            }
        ]
    },
    {
        path:'e-levy',
        title:'E-Levy',
        icon:<FaRegMoneyBillAlt className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'merchant-settlement',
        title:'Settlement',
        icon:<SiWebmoney className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'merchant-settlement/new',
                icon:<GiReceiveMoney className="mr-3 text-xl"/>,
                title:'Initiate'
            },
            {
                path:'merchant-settlement/approvals',
                icon:<VscArrowSwap className="mr-3 text-xl"/>,
                title:'Approvals'
            },
            {
                path:'merchant-settlement/all',
                icon:<BsClockHistory className="mr-3 text-xl"/>,
                title:'History'
            }
            
        ]
    },
    {
        path:'direct-debit',
        title:'Direct Debit',
        icon:<VscFileSymlinkDirectory className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'merchants',
        title:'Merchants',
        icon:<FiUsers className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'merchants/all',
                icon:<MdOutlineSkateboarding className="mr-3 text-2xl"/>,
                title:'Merchants Onboarding'
            },
            {
                path:'merchants/transactions',
                icon:<GiPayMoney className="mr-3 text-xl"/>,
                title:'Transactions'
            },
            {
                path:'merchants/categories',
                icon:<BiCategory className="mr-3 text-xl"/>,
                title:'Categories'
            },
        ]
    },
    {
        path:'wallets',
        title:'Wallets',
        icon:<BsWallet2 className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    // {
    //     path:'agents',
    //     title:'Agents',
    //     icon:<FiUsers className="mr-3 text-xl"/>,
    //     hasChild : false,
    //     children:[]
    // },
    {
        path:'referrals',
        title:'Referrals',
        icon:<RiShareForwardLine className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'sms-broadcast',
        title:'Sms Broadcast',
        icon:<GiSpeaker className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
];

const access={
    routes,
    roles
}
export default access;