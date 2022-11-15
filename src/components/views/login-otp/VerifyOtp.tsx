import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import { useDispatch } from "react-redux";
import { signOut } from "../../../state/auth.state";

const Swal = require("sweetalert2");

const VerifyOtp: React.FC = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.validateOtp({
        idn: location.state.email,
        otp: code,
      });
      setLoading(false);
      await Swal.fire({
        position: "center",
        icon: res.success ? "success" : "error",
        text: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
      if (!res.success) {
        dispatch(signOut());
        window.localStorage.clear();
        sessionStorage.clear();
        return navigate("/login");
      }
      sessionStorage.setItem("PP-USER", JSON.stringify(location.state.data));
      navigate(from, { replace: true });
    } catch (err: any) {
      dispatch(signOut());
      setLoading(false);
      alert(err.message);
      return navigate("/login");
    }
  };

  return (
    <>
      <h1 className="text-black mt-6 font-inter">Login Verification</h1>
      <h6 className="text-black mt-6 font-inter">
        Check your email and enter OTP code
      </h6>
      <div className="w-1/3 border border-gray-200 mx-auto mt-10 px-5 py-5 font-inter">
        <div className="font-segoe">
          <label className="text-left block mt-4 text-sm">OTP Code</label>
          <input
            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
            placeholder="code"
            type="text"
            name="code"
            value={code}
            onChange={(e: any) => setCode(e.target.value)}
          />
        </div>
        <button
          onClick={(e) => onSubmit(e)}
          className="block w-full px-4 py-2 mt-4 text-lg leading-5 text-center text-white transition-colors duration-150 bg-pink border border-transparent rounded active:bg-red-600 focus:outline-none"
          type="submit"
        >
          {loading ? "Validating..." : "Validate"}
        </button>
      </div>
    </>
  );
};

export default VerifyOtp;
