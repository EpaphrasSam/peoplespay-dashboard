import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine, RiProfileLine } from "react-icons/ri";

interface AppProps {
  drawerOpen: boolean;
  close: Function;
  name: string;
  email: string;
  acc_type: string;
  user: any;
  signout: Function;
}

const SlideDrawer: React.FC<AppProps> = ({
  drawerOpen,
  close,
  name,
  email,
  acc_type,
  signout,
  user,
}) => {
  const navigate = useNavigate();

  if (drawerOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <>
      {drawerOpen && (
        <div
          className=" bg-white fixed top-0 md:1/4 right-0  overflow-hidden"
          style={{
            boxShadow: "1px 0px 7px rgba(0,0,0,0.5)",
            transform: "translateX(100%), transition:transform 0.3s ease-out",
            zIndex: 100,
            width: "330px",
          }}
        >
          <div className="mt-6 mb-3" style={{ marginLeft: "250px" }}>
            <button onClick={(e) => close(e)}>
              <i className="fas fa-arrow-right bg-gray-100 hover:bg-gray-200 py-2 px- w-10 rounded" />
            </button>
          </div>

          <hr className="text-gray-400 w-full mt-2" />

          <div className="flex flex-col items-center xl:flex-row xl:items-center flex-wrap sm:flex-nowrap mx-5 mt-3 space-x-auto">
            <div className="ml-5 flex flex-col">
              <h3 className="text-gray-600 w-64 text-xl font-bold break-all">
                {name}
              </h3>

              <div className="mt-3  items-center space-x-1 ">
                {email && <i className="fa fa-envelope text-blue-400" />}
                <span
                  className="text-gray-500 w-64 break-all"
                  style={{ font: "15px" }}
                >
                  {email}
                </span>
              </div>
              {/* <div className="-ml-7  w-64 break-all text-gray-500 font-semibold text-lg capitalize">
                {acc_type}
              </div> */}
            </div>
          </div>

          <hr className="text-gray-400 w-full mt-2" />

          <div className="flex flex-col gap-2 mt-3 mb-3">
            <div className="flex flex-row ml-5">
              <div className=" rounded mr-1 w-auto">
                <RiProfileLine color="gray" size={20} className="mx-3 mt-4" />
              </div>
              <Link to="#">
                <h3 className="pt-3 text-gray-600 text-lg font-bold hover:text-red-600">
                  My Profile
                </h3>
              </Link>
            </div>
            <p className="ml-5  text-gray-400 text-md">
              {/* <Link
                to="/profile-settings"
                onClick={(e) => close(e)}
                className="hover:underline"
              >
                Account settings and more
              </Link> */}

              {/* <div className="ml-2 py-2 px-2 bg-red-100 text-red-500 hover:bg-red-300 rounded font-semibold">
                  Change password
                </div> */}
              <div className="flex flex-row gap-2 ml-3">
                <RiLockPasswordLine size={20} style={{ marginTop: "12px" }} />
                <Link to={"/change-password"}>
                  <h3 className="pt-3 ml-2 text-gray-600 text-lg font-bold hover:text-red-600">
                    Change Password
                  </h3>
                </Link>
              </div>
            </p>

            <hr className="text-gray-400 w-full mt-2" />

            <div className="ml-9 mt-3 mb-4 ">
              <div className="flex flex-row items-center gap-2">
                <MdOutlineLogout
                  size={20}
                  color="gray"
                  style={{ marginTop: "10px" }}
                />
                <button
                  className={`text-lg pt-2 ml-1 ${
                    user !== null
                      ? "text-gray-600 hover:text-red-600"
                      : "text-gray-600 hover:text-red-600"
                  } font-bold rounded-md`}
                  onClick={() =>
                    user !== null ? signout() : navigate("/login")
                  }
                >
                  {user !== null ? "Sign out" : "Login"}
                </button>
              </div>
            </div>
          </div>
          {/* <hr className="text-gray-400 mx-auto w-5/6 mt-2" /> */}

          {/* <div className="flex flex-row items-center justify-between mx-5 mt-3 mb-9">
            <h2 className="text-gray-800 text-xl font-bold mb-5">
              Recent Notifications
            </h2>
            <button className="text-gray-400 underline shadow-sm pb-5">
              Clear all
            </button>
          </div> */}

          {/**activity level */}
          {/* <div className='flex flex-wrap mx-5 mt-3 bg-yellow-50 rounded-lg max-w-lg h-24 mb-5'>
                <div className='rounded mr-2 py-7'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mt-2 ml-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                </svg>
                </div>
                <div className='py-7'>
                    <h3 className=' text-gray-400 text-xl font-bold ml-2'>Activity level</h3>
                    <p className='ml-1 text-gray-400 text-md tracking-widest font-semibold'>30 mins ago</p>     
                </div>
                <div className='ml-auto pr-4 pt-5'>
                 <span className='text-left font-bold text-yellow-500 font-sans'>+ 50 % </span>
                </div>
            </div> */}

          {/**second tile */}
          {/* <div className='flex flex-wrap mx-5 mt-3 bg-yellow-50 rounded-lg max-w-lg h-auto mb-5'>
                <div className='rounded mr-2 py-7'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mt-2 ml-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                </svg>
                </div>
                <div className='py-7'>
                    <h3 className='text-gray-400 text-xl font-semibold ml-2'>Loan of ghs100 accepted</h3>
                    <h3 className='text-gray-400 text-xl font-semibold ml-2 text-left'>from GBC</h3>
                    <p className='ml-1 text-gray-400 text-md tracking-widest font-semibold text-left'>30 mins ago</p>     
                </div>
                <div className='ml-auto pr-4 -my-20 md:my-auto '>
                <span className='text-left font-bold text-yellow-500 font-sans'>+ 50 % </span>
                </div>
            </div> */}
        </div>
      )}
    </>
  );
};

export default SlideDrawer;
