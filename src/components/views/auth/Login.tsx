import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../../services/auth.service";
import { Navigate, useNavigate } from "react-router-dom";
import { authSelector, setAuth, setAdmins } from "../../../state/auth.state";
import Utils from "../../../utils/AuthToken";

function Login() {
  const dispatch = useDispatch();
  
  const { admins } = useSelector(authSelector);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await AuthService.getAdminAccess();
      if (!response.success) {
        alert("loading admin failed");
      }
      dispatch(setAdmins(response.data));
    } catch (err) {}
  };

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
      if (!response.success) {
        throw Error(response.message);
      }

      console.log(response.data);
      setLoading(false);
      Utils.setAuthToken(response.token);
      sessionStorage.setItem("PP-USER", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (err: any) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-50">
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
                <img className="h-20 mb-5" src="/assets/logo.png" alt="pic" />
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Admin Login
              </h1>
              <div>
                <div>
                  <label className="block text-sm">Choose your Account</label>
                  <select
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-gray-200"
                    placeholder="enter email or number"
                    name="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  >
                    <option value="none" selected disabled hidden>choose account</option>
                    {admins.map((ad, i) => (
                      <option key={i.toString()} value={ad.email}>
                        {ad.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mt-4 text-sm">Password</label>
                  <input
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
                    placeholder="enter password"
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <p className="mt-4">
                  <a
                    className="text-sm text-blue-600 hover:underline"
                    href="./forgot-password.html"
                  >
                    Forgot your password?
                  </a>
                </p>

                <button
                  onClick={login}
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-blue"
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
