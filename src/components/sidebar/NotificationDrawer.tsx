import React from "react";

interface AppProps {
  notifyopen: boolean;
  close: Function;
}

const NotificationDrawer: React.FC<AppProps> = ({ notifyopen, close }) => {
  if (notifyopen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <>
      {notifyopen && (
        <div
          className="w-64 bg-white fixed top-0 md:1/4 right-0  overflow-auto"
          style={{
            boxShadow: "1px 0px 7px rgba(0,0,0,0.5)",
            transform: "translateX(100%), transition:transform 0.3s ease-out",
            zIndex: 100,
            minHeight: "50vh",
            maxHeight: "100vh",
          }}
        >
          <div className="mt-6 mb-3 mr-2" style={{ marginLeft: "190px" }}>
            <button onClick={(e) => close(e)}>
              <i className="fas fa-arrow-right bg-gray-100 hover:bg-gray-200 py-2 w-10 rounded" />
            </button>
          </div>
          {/* <div className="flex flex-row items-center text-center  mt-3 mb-9"> */}
          <h2 className="text-gray-800 text-lg font-bold mb-5">
            No Notifications
          </h2>
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default NotificationDrawer;
