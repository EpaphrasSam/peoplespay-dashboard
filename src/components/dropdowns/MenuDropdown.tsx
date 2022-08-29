import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Link} from 'react-router-dom'



export default function MenuItem({data}:any) {
  return (
    <Menu as={React.Fragment}>
      { !data.hasChild ? 
      <Link to={data.path} className="flex flex-row items-center">
          {data.icon}
        <Menu.Button>
          <span>{data.title}</span>
        </Menu.Button>
      </Link>
      :(
        <div className='flex flex-row items-center'>{data.icon}<Menu.Button>
              <span className='cursor-pointer'>{data.title}</span>
            </Menu.Button>
        </div>
        )
      }
      
           <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
      <Menu.Items className="bg-pink px-1 text-left absolute right-0 mt-2 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none w-full rounded-md">
       <div>
       {data.children && data.children.map((item:any,i:number)=>
       (<><Menu.Item key={i.toString()}><Link to={item.path} className="flex items-center py-2 text-sm text-white">
          {item.icon}
         {item.title}
       </Link>
          </Menu.Item></>))}
        </div>
        </Menu.Items>
        </Transition>
      </Menu>
  )
}
