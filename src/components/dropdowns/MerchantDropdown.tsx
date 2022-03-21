import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Link} from 'react-router-dom'



export default function MenuItem({data}:any) {
  return (
    <Menu as={React.Fragment}>
      <i className='fas fa-hand-holding-usd mr-2  text-red-900'></i>
      <Menu.Button>
        <span className='text-red-900 uppercase text-sm font-semibold cursor-pointer font-sans'>{data.title}</span>
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
      {data.children.map((item:any,i:number)=><Menu.Items key={i.toString()} className="bg-red-700 absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
       <div className='bg-red-700'>
          <Menu.Item>
                {() => (
              <Link
                className="uppercase flex items-center px-4 py-4 text-xs text-white hover:bg-red-800"
                to={item.path}
                  >
                <i className={item.icon}/>
                {item.title}
              </Link>
            )}
          </Menu.Item>
          </div>
        </Menu.Items>)}
        </Transition>
      </Menu>
  )
}