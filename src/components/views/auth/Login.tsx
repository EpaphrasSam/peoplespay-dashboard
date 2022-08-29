import React, { useState } from "react";
import {useNavigate,useLocation}from 'react-router-dom'
import AuthService from "../../../services/auth.service";
import Utils from "../../../utils/AuthToken";
import { alertResponse } from "../../sweetalert/SweetAlert";


function Login() {
  const navigate=useNavigate()
  const location=useLocation()
  const from = location.state?.from?.pathname||'/dashboard'

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const { email, password } = formData;
      if (email === "" || password === "") {
        throw Error("Email or Password cannot be null");
      }
      setLoading(true);
      const response = await AuthService.login({
        email: email,
        password: password,
      });
      await alertResponse({
        icon: response.success?'success':'error',
        response:response.message
       }).then(()=> setLoading(false))
      if(response.success){
        Utils.setAuthToken(response.token);
        sessionStorage.setItem("PP-USER", JSON.stringify(response.data));
        //navigate(response.data._role?.access[0].path);
        navigate(from,{replace:true})
      }
    } catch (err: any) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-50 font-inter">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="/assets/login.jpg"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex justify-center">
                <img className="h-20 mb-5 rounded" src="/assets/logo.png" alt="pic" />
              </div>
              <h1 className="mb-4 text-2xl text-center font-poppins">
                Admin Login
              </h1>
              <div>
                <div>
                  <label className="block mt-4 text-sm text-left">Email</label>
                  <input
                    className="w-full px-4 py-2 text-sm border rounded focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mt-4 text-sm text-left">Password</label>
                  <input
                    className="w-full px-4 py-2 text-sm border rounded focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                {/* <p className="mt-4">
                  <a
                    className="text-sm text-blue-600 hover:underline"
                    href="./forgot-password.html"
                  >
                    Forgot your password?
                  </a>
                </p> */}

                <button
                  onClick={login}
                  className="block w-full px-4 py-2 mt-4 text-md leading-5 text-center text-white transition-colors duration-150 bg-pink border border-transparent rounded active:bg-red-600 focus:outline-none focus:shadow-outline-blue"
                  type="submit"
                >
                  {loading ? <div>Loggin in...</div> : <div>Login</div>}
                </button>
              </div>

              <hr className="my-8" />

              <div className="flex items-center justify-center gap-4 text-gray-500 leading-tight text-xs">
                <p>Privacy Policy</p>
                <p>Terms</p>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

