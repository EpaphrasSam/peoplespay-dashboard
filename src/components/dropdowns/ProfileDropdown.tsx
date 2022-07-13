import { Menu } from '@headlessui/react'

const say=()=>window.alert("hi");
//window.localStorage.clear();window.location.href = '/'
function ProfileDropdown({name}:{name:string}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>{name}</Menu.Button>
      <Menu.Items className="absolute mt-2 right-0">
        <Menu.Item as="button"
        onClick={(e)=>say()}>
            <a 
              className="bg-red-100 rounded px-10 py-2 text-red-700 cursor:pointer">
               Logout
            </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
export default ProfileDropdown;