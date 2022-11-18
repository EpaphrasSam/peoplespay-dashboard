import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "../dropdowns/MenuDropdown";
import access, { Route } from "./Routes";
import SlideDrawer from "./SideDrawer";
import { signOut } from "../../state/auth.state";

export default function Sidebar() {
  const { user } = useSelector((state: any) => state.auth);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [paths, setPaths]: any = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const close = () => setDrawerOpen(false);

  const signout = () => {
    dispatch(signOut());
    window.localStorage.clear();
    sessionStorage.clear();
    return navigate("/login");
  };

  const str = user?.name;
  const acronym = str
    ?.split(/\s/)
    .reduce(
      (response: any, word: string | any[]) => (response += word.slice(0, 1)),
      ""
    );

  useEffect(() => {
    if (user && Array.isArray(user?._role?.access)) {
      let _paths: any[] = [];
      access.roles.forEach((route: Route) => {
        if (route.hasChild) {
          let children: Array<Route> | undefined = route.children?.filter((r) =>
            user?._role?.access.find((p: any) => r.path === p.path)
          );
          if (children && children.length > 0) {
            route.children = children;
            _paths.push(route);
          }
        } else {
          user?._role?.access?.forEach((p: any) => {
            if (route.path === p.path) {
              _paths.push(route);
            }
          });
        }
      });

      setPaths(_paths);
    } else if (user && Array.isArray(user.access)) {
      //if(user && Array.isArray(user.access)){}
      let _paths: any[] = [];
      access.routes.forEach((route: Route) => {
        if (route.hasChild) {
          let children: Array<Route> | undefined = route.children?.filter((r) =>
            user.access.find((p: string) => r.path === p)
          );
          if (children && children.length > 0) {
            route.children = children;
            _paths.push(route);
          }
        } else {
          user.access.forEach((p: string) => {
            if (route.path === p) {
              _paths.push(route);
            }
          });
        }
      });

      setPaths(_paths);
    }
  }, [user]);

  if (collapseShow !== "hidden") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <>
      <SlideDrawer
        drawerOpen={drawerOpen}
        close={close}
        name={user?.name}
        email={user?.email}
        acc_type={user?.account_type}
        signout={signout}
        user={user}
      />
      <nav className="font-inter md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-lg bg-white flex flex-wrap  justify-between relative md:w-56 py-4 px-6 border-none scrollbar-thin scrollbar-thumb-pink scrollbar-track-red-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full z-50">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto ">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 text-xl px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand hidden md:block md:fixed */}
          <div className="hidden md:block bg-white top-0 pt-4 md:w-48">
            <Link onClick={() => setCollapseShow("hidden")} to="/dashboard">
              <img
                className="w-20 mx-auto pb-0 rounded-full cursor-pointer z-50"
                src="/assets/logo.png"
                alt="logo"
              />
            </Link>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <ul className="flex-row gap-2 list-none items-center">
                <div className="flex flex-row">
                  {user && (
                    <>
                      <span className="font-light pt-2 uppercase">active</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 rounded-full  w-5 text-sgreen flex flex-row flex-wrap items-center lg:ml-auto mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                  {/* <ProfileDropdown name={user?.name}/> */}
                  {user !== null ? (
                    <button
                      className="text-red-700 uppercase font-bold bg-red-100 w-auto p-1 rounded-full"
                      onClick={() => setDrawerOpen(true)}
                    >
                      {acronym || "N/A"}
                    </button>
                  ) : (
                    <button
                      className="bg-pink text-white px-4 py-2 font-bold rounded"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  )}
                </div>
              </ul>
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto overflow-x-hidden h-auto  flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="flex w-6/12">
                  <Link
                    onClick={() => setCollapseShow("hidden")}
                    to="/dashboard"
                  >
                    <img
                      className="w-20 mx-5 pb-0 rounded-full"
                      src="/assets/logo.png"
                      alt="logo"
                    />
                  </Link>
                  {/* <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold pt-6 px-0"
                    to="/"
                  >
                    PeoplesPay
                  </Link> */}
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 text-xl py-1 leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Heading */}
            {/* <h6 className="text-center md:min-w-full text-pink-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline mt-4 ">
              Admin Layout Pages
            </h6> */}
            {/* Navigation */}
            <ul className="text-left flex flex-col list-none">
              {paths.map((p: any, i: number) => (
                <li className="group py-4  text-gray-600 text-md hover:text-pink tracking-tighter">
                  <MenuItem
                    key={i.toString()}
                    data={p}
                    setCollapseShow={setCollapseShow}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
