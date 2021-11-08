import React from 'react'
import { Menu, Transition } from '@headlessui/react'



export default function UsersDropdown() {
  return (
    <Menu as={React.Fragment}>
      <i className='fas fa-users mr-5  text-sm text-red-900'></i>
      <Menu.Button>
              <span className='text-red-900 uppercase text-xs font-semibold cursor-pointer'>users</span>
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
            <a
              className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
              href="/account-settings"
                >
              <i className='fas fa-dollar-sign mr-2'/>
              user transactions
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
         {() => (
            <a
              className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
              href="/account-settings"
                >
                  <i className='fas fa-eye mr-2'/>
              view users
            </a>
          )}
            </Menu.Item>
          </div>
        </Menu.Items>
        </Transition>
      </Menu>
  )
}