import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../header/PageHeader";
import MerchantsService from "../../../services/merchant.service";
import { setMerchants } from "../../../state/merchant.state";
import converter from "../../../utils/Base64.converter";
import AccountsService from "../../../services/accounts.service";
import { confirmAlert, alertResponse } from "../../sweetalert/SweetAlert";

const swal = require("sweetalert2");

const AddDocuments: React.FC = () => {
  const dispatch = useDispatch();
  const { merchants } = useSelector((state: any) => state.merchants);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const loadMerchants = async () => {
    try {
      const merchants = await MerchantsService.getMerchants();
      if (!merchants.success) {
        throw Error("Oops there is a problem loading some of the services");
      }
      dispatch(setMerchants(merchants.data || []));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadMerchants();
  }, []);

  const [formData, setFormData]: any = useState({
    merchantId: "",
    docxName: "",
    data: "",
  });

  const onFileChange = async (e: any) => {
    if (e.target.files != null) {
      if (e.target.files[0].size > 500000) {
        return swal.fire({ html: "<div>File cannot be larger than 5mb</div>" });
      }
      const encoded = await converter(e.target.files[0]);
      setFormData({ ...formData, data: encoded });
      const fN = e.target.files[0].name;
      setFileName(fN.replace(/\.[^/.]+$/, ""));
    }
  };

  const add = async () => {
    try {
      console.log(formData.data);
      setIsLoading(true);
      Object.keys(formData).forEach((key: any) => {
        if (!formData[key] || formData[key] === "") {
          setIsLoading(false);
          return swal.fire({
            html: "<div>Please fill all details</div>",
          });
        }
      });
      confirmAlert({
        text: `Document would be upload for selected merchant`,
        confirmButtonText: "Yes, proceed",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await MerchantsService.addDocuments({
            id: formData.merchantId,
            name: formData.docxName,
            data: formData.data,
            path: "merchants",
          });
          await alertResponse({
            icon: response.success ? "success" : "error",
            response: response.message,
          });
          setIsLoading(false);
          setFileName("");
          return setFormData({
            merchantId: "",
            docxName: "",
            data: "",
          });
        }
        alertResponse({
          icon: "error",
          response: "You cancelled this process",
        });
      });
    } catch (error: any) {
      setIsLoading(false);
      alertResponse({
        icon: "info",
        response: error.message,
      });
    }
  };

  return (
    <div className="relative flex flex-col shadow-md items-center md:pt-10 pb-10  w-full">
      <PageHeader title="Add Merchant Documents" />

      <div className="flex flex-col items-center px-4 w-full lg:px-10 py-10 pt-0">
        <div className="relative w-6/12 mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
            htmlFor="grid-password"
          >
            select merchant
          </label>
          <select
            className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            name="merchantId"
            value={formData.merchantId}
            onChange={(e) =>
              setFormData({ ...formData, merchantId: e.target.value })
            }
            placeholder="select merchant"
          >
            {merchants.map((mer: any, i: number) => (
              <option key={i} value={mer?._id}>
                {mer.merchant_tradeName}
              </option>
            ))}
          </select>
        </div>
        <div className="relative w-6/12 mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
            htmlFor="grid-password"
          >
            Document Name
          </label>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            name="documentName"
            value={formData.docxName}
            onChange={(e) =>
              setFormData({ ...formData, docxName: e.target.value })
            }
          />
        </div>
        <div className="relative w-6/12 mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
            htmlFor="grid-password"
          >
            File
          </label>
          <input
            type="file"
            id="fileupload"
            className="hidden border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            name="documentName"
            onChange={(e) => onFileChange(e)}
          />
          <label
            className={
              fileName
                ? "block uppercase text-gray-700 shadow p-2 text-xs font-semibold mb-2 text-left"
                : "block p-2 bg-gray-300 text-gray-700"
            }
            htmlFor="fileupload"
          >
            {fileName ? fileName : "Select File"}
          </label>
        </div>
      </div>
      <button
        onClick={add}
        className="w-1/3 mx-auto uppercase font-bold text-sm float-right mb-4 bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800"
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default AddDocuments;
