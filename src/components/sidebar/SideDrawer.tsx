import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

  return (
    <>
      {drawerOpen && (
        <div
          className="h-screen bg-white fixed top-0 w-full sm:w-1/3 md:1/4 right-0 z-50 overflow-auto"
          style={{
            boxShadow: "1px 0px 7px rgba(0,0,0,0.5)",
            transform: "translateX(100%), transition:transform 0.3s ease-out",
          }}
        >
          <div className="mt-10 mb-3 flex justify-between mx-5">
            <h2 className="float-left lg:pl-28 font-bold text-2xl text-gray-500">
              User Profile
              <br />
              <span className="pl-2 text-md text-gray-300 leading-tight font-light">
                0 Notifications
              </span>
            </h2>
            <button onClick={(e) => close(e)}>
              <i className="fas fa-arrow-right bg-gray-100 hover:bg-gray-200 py-2 px- w-10 rounded" />
            </button>
          </div>
          <div className="flex flex-col items-center xl:flex-row xl:items-center flex-wrap sm:flex-nowrap mx-5 mt-3 space-x-auto">
            <div className="relative bg-gray-100 w-32 h-32 rounded-lg">
              <div>
                <FaUser className="h-28 w-28 text-gray-400 py-1 mx-auto pt-2" />
              </div>
              <div className="absolute top-0 right-0 h-5 w-5 my-0 border-2 border-white rounded-full bg-green-400 z-2"></div>
            </div>
            {/**Person avatar */}
            <div className="ml-5">
              <h3 className="text-gray-600 text-xl font-bold">{name}</h3>
              <div className="-ml-7 mt-3 text-gray-200 font-semibold text-2xl">
                {acc_type}
              </div>
              <div className="mt-3 mb-3 inline-flex items-center space-x-1 float-left">
                {email && <i className="fa fa-envelope text-blue-400" />}
                <span className="text-gray-300 text-lg">{email}</span>
              </div>
              <div className="ml-4 mt-3">
                <button
                  className={`px-10 py-3 ${
                    user !== null
                      ? "bg-blue-50 text-blue-400 hover:bg-blue-200"
                      : "bg-pink text-white"
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
          {/**hr */}
          <hr className="text-gray-400 mx-auto w-5/6 mt-2" />

          <div className="flex flex-col gap-2 mx-5 mt-3 mb-3 items-center ">
            <div className="flex flex-row">
              <div className="bg-gray-100 rounded mr-2 w-auto">
                <i className="fas fa-address-card py-4 px-auto w-14 text-gray-500 " />
              </div>
              <h3 className="pt-3 text-gray-600 text-xl font-bold">
                My Profile
              </h3>
            </div>
            <p className="ml-5  text-gray-400 text-md">
              <Link
                to="/profile-settings"
                onClick={(e) => close(e)}
                className="hover:underline"
              >
                Account settings and more
              </Link>
              <Link to={"/change-password"}>
                <div className="ml-2 py-2 px-2 bg-red-100 text-red-500 hover:bg-red-300 rounded font-semibold">
                  Change password
                </div>
              </Link>
            </p>
          </div>

          <hr className="text-gray-400 mx-auto w-5/6 mt-2" />

          <div className="flex flex-row items-center justify-between mx-5 mt-3 mb-9">
            <h2 className="text-gray-800 text-xl font-bold mb-5">
              Recent Notifications
            </h2>
            <button className="text-gray-400 underline shadow-sm pb-5">
              Clear all
            </button>
          </div>

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
