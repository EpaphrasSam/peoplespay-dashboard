import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Link} from 'react-router-dom'



export default function MerchantsDropdown() {
  return (
    <Menu as={React.Fragment}>
      <i className='fas fa-hand-holding-usd mr-2  text-red-900'></i>
      <Menu.Button>
        <span className='text-red-900 uppercase text-sm font-semibold cursor-pointer font-sans'>Merchants</span>
      </Menu.Button>
      
           <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
      <Menu.Items className="bg-red-700 absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
       <div className='bg-red-700'>
        <Menu.Item>
              {() => (
            <Link
              className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
              to="/merchants"
                >
              <i className='fas fa-eye mr-2'/>
              View Merchants
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
         {() => (
            <Link
              className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
              to="/merchant-transactions"
                >
             <i className='fas fa-coins mr-2'/>
              Merchant transactions
            </Link>
          )}
            </Menu.Item>
            <Menu.Item>
         {() => (
            <Link
              className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
              to="/merchant-categories"
                >
             <i className='fas fa-list-alt mr-2'/>
              Merchant categories
            </Link>
          )}
            </Menu.Item>
            <Menu.Item>
         {() => (
            <Link
              className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
              to="/create-merchant"
                >
                <i className='fas fa-coins mr-2'/>
              create merchant
            </Link>
          )}
        </Menu.Item>
          </div>
        </Menu.Items>
        </Transition>
      </Menu>
  )
}