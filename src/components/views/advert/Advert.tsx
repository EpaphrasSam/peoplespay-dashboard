import { useState, useRef, useEffect } from "react";
import PageHeader from "../../header/PageHeader";
import { PrimaryButton } from "../../buttons/BasicButton";
import { AiOutlinePlus } from "react-icons/ai";
import "./Advert.css";
import converter from "../../../utils/Base64.converter";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";
import advertService from "../../../services/advert.service";
import { confirmAlert, alertResponse } from "../../sweetalert/SweetAlert";
import Spinner from "../layout/Spinner";
import { RiDeleteBinLine } from "react-icons/ri";

const swal = require("sweetalert2");

function Advert() {
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [adverts, setadverts] = useState([]);
  const [fileName, setFileName] = useState("");
  const isTextareaDisable = fileName.length === 0;
  const inputRef: any = useRef(null);
  var ftMustMatch = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
  const [formData, setFormData]: any = useState({
    title: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    const getAdverts: Function = async () => {
      try {
        setisLoading(true);
        const response = await advertService.getAdverts();
        if (!response.success) {
          setisLoading(false);
          return alert(response.message);
        } else {
          setadverts(response.data);
          setisLoading(false);
        }
      } catch (err: any) {
        alert(err);
        setisLoading(false);
      }
    };
    getAdverts();
  }, []);
  const resetFileInput = () => {
    inputRef.current.value = null;
    setFileName("");
  };
  const onFileChange = async (e: any) => {
    if (e.target.files != null) {
      if (e.target.files[0].size > 500000) {
        swal.fire({ html: "<div>Image cannot be larger than 5mb</div>" });
        return resetFileInput();
      }
      if (
        ftMustMatch.indexOf(String(e.target.files[0].type).toLowerCase()) < 0
      ) {
        swal.fire({ html: "<div>Only Image upload allowed</div>" });
        return resetFileInput();
      }
      const encoded = await converter(e.target.files[0]);
      setFormData({ ...formData, image: encoded });
      const fN = e.target.files[0].name;
      setFileName(fN.replace(/\.[^/.]+$/, ""));
    }
  };
  const addAdverts = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      confirmAlert({
        text: "This will add the advert",
        confirmButtonText: "Yes, add",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await advertService.addAdverts(formData);
          if (!res.success) {
            return alertResponse({
              icon: "info",
              response: res.message,
            });
          }
          setshowModal(false);
          await alertResponse({
            icon: "success",
            response: res.message,
          });
          return window.location.reload();
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
    resetFileInput();
    console.log(formData);
    setshowModal(false);
  };
  const updateAdverts = async (id: string, status: string): Promise<void> => {
    try {
      confirmAlert({
        text: "This will change the status of advert",
        confirmButtonText: "Yes, change",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const Data = {
            id: id,
            data: {
              status: status,
            },
          };
          const res = await advertService.updateAdverts(Data);
          if (!res.success) {
            return alertResponse({
              icon: "info",
              response: res.message,
            });
          }
          await alertResponse({
            icon: "success",
            response: res.message,
          });
          return window.location.reload();
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };
  const deleteAdverts = async (id: string): Promise<void> => {
    try {
      confirmAlert({
        text: "This will delete the advert",
        confirmButtonText: "Yes, delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await advertService.deleteAdverts(id);
          if (!res.success) {
            return alertResponse({
              icon: "info",
              response: res.message,
            });
          }
          await alertResponse({
            icon: "success",
            response: res.message,
          });
          return window.location.reload();
        }
      });
    } catch (err: any) {
      alertResponse({
        icon: "info",
        response: err.message,
      });
    }
  };
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <div className="relative min-h-screen md:pt-10 pb-10 p-2 w-full mb-12 px-4">
      {showModal && (
        <div
          className="relative z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={() => setshowModal(false)}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:min-w-sm w-1/2">
                <form onSubmit={addAdverts}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h4 className="text-center pb-3 text-pink">Add Advert</h4>
                    <label className="block mt-4 text-sm text-left">
                      Title
                    </label>
                    <input
                      className="w-full px-4 py-2 text-sm border border-gray-500 rounded focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-gray-200"
                      placeholder="Enter Title"
                      type="text"
                      name="title"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                    <label className="block mt-4 text-sm text-left">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 text-sm border border-gray-500 rounded focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-gray-200"
                      placeholder="Enter description"
                      name="description"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                    <label
                      className="block mt-4 text-sm text-left"
                      htmlFor="grid-password"
                    >
                      Image Upload
                    </label>
                    <input
                      type="file"
                      id="fileupload"
                      ref={inputRef}
                      className="hidden border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="documentName"
                      onChange={(e) => onFileChange(e)}
                      required
                    />
                    <label
                      className={
                        fileName
                          ? "block uppercase text-gray-700 shadow p-2 text-xs font-semibold mb-2 text-center cursor-pointer hover:bg-gray-100"
                          : "block p-2 bg-gray-300 text-gray-700 text-center cursor-pointer hover:bg-gray-400"
                      }
                      htmlFor="fileupload"
                    >
                      {fileName ? fileName : "Select Image"}
                    </label>
                  </div>
                  <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row space-x-3 float-right">
                    <button
                      className={
                        !isTextareaDisable
                          ? "inline-flex items-center py-1.5 px-4 bg-blue-500 text-white rounded hover:shadow outline focus:outline-none ease-linear transition-all duration-150 hover:bg-blue-600 tracking-wide font-inter border border-blue-400 space-x-2"
                          : "inline-flex items-center py-1.5 px-4 bg-gray-600 text-gray-400 rounded cursor-default font-inter border border-gray-400 space-x-2"
                      }
                      type="submit"
                      disabled={isTextareaDisable}
                    >
                      Submit
                    </button>
                    <button
                      className="inline-flex items-center py-1.5 px-4 bg-gray-500 text-white rounded hover:shadow outline focus:outline-none ease-linear transition-all duration-150 hover:bg-gray-600 tracking-wide font-inter border border-gray-400 space-x-2"
                      onClick={() => {
                        setshowModal(false);
                        resetFileInput();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <PageHeader title="Advert" />
      <div className="pb-5">
        <PrimaryButton
          value="Add Advert"
          color="blue"
          icon={<AiOutlinePlus />}
          action={() => {
            setshowModal(true);
          }}
        />
      </div>
      <div className="wrap">
        {isLoading ? (
          <div
            style={{
              position: "relative",
              top: "120px",
              left: "200px",
            }}
          >
            <Spinner />
          </div>
        ) : (
          adverts.length !== 0 &&
          adverts.map((ad: any) => (
            <div className="Ccards">
              <img className="Cicon" src={ad.image} alt="advert" />
              <div className="Cheader">{ad.title}</div>
              {ad.description.length < 70 ? (
                <div>{ad.description}</div>
              ) : (
                <div data-title={ad.description}>
                  {ad.description.slice(0, 70)} ...
                </div>
              )}
              <div className="flex flex-row py-3 gap-5">
                {ad.status === "active" ? (
                  <div className="group">
                    <HiStatusOnline
                      size={30}
                      className="text-sgreen cursor-pointer"
                      onClick={() => updateAdverts(ad._id, "inactive")}
                    />
                    <div className="opacity-0 group-hover:opacity-100 duration-300 break-all absolute text-sgreen font-semibold">
                      Status:
                      <br />
                      Active
                    </div>
                  </div>
                ) : (
                  <div className="group">
                    <HiStatusOffline
                      size={30}
                      className="text-red-900 cursor-pointer"
                      onClick={() => updateAdverts(ad._id, "active")}
                    />
                    <div className="opacity-0 group-hover:opacity-100 duration-300 text-red-900 absolute font-semibold">
                      Status:
                      <br />
                      Inactive
                    </div>
                  </div>
                )}
                <div className="group">
                  <RiDeleteBinLine
                    size={30}
                    className="hover:text-red-800 text-red-600 cursor-pointer"
                    onClick={() => deleteAdverts(ad._id)}
                  />
                  <div className="opacity-0 group-hover:opacity-100 duration-300 text-red-900 absolute font-semibold">
                    Delete
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Advert;
