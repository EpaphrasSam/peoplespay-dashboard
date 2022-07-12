import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Link} from 'react-router-dom'



export default function MenuItem({data}:any) {
  return (
    <Menu as={React.Fragment}>
      { !data.hasChild ? 
      <Link to={data.path}>
        <i className={data.icon}></i>
        <Menu.Button>
          <span>{data.title}</span>
        </Menu.Button>
      </Link>
      :(
      <><i className={data.icon}></i><Menu.Button>
            <span className='cursor-pointer'>{data.title}</span>
          </Menu.Button></>)
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
      <Menu.Items className="bg-pink px-5 text-left absolute right-0 mt-2 origin-top-right rounded-none ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
       <div>
       {data.children && data.children.map((item:any,i:number)=>
       (<><Menu.Item key={i.toString()}><Link to={item.path} className="flex items-center py-4 text-md  text-white">
         <i className={item.icon} />
         {item.title}
       </Link>
          </Menu.Item></>))}
        </div>
        </Menu.Items>
        </Transition>
      </Menu>
  )
}