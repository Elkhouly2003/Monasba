import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "./context/AppContext";
import { toast } from "react-toastify";
import { assets } from "./assets/assets";



const Login = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {backendUrl,setIsLoggedIn,getUserData} = useContext(AppContext);
    const navigate = useNavigate();

    // Handle form submission
    const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  axios.defaults.withCredentials = true;
  try {
    if (isCreatingAccount) {
      // Sign Up
      const response = await axios.post(`${backendUrl}/register`, { name, email, password });
      if (response.status === 201) {
        toast.success("Account created successfully!");
        setIsCreatingAccount(false);
        navigate("/");
      }
    } else {
      // Login
       // Login
      const response = await axios.post(`${backendUrl}/login`, { email, password });
      if (response.status === 200) {
        toast.success("Logged in successfully!");
        getUserData();
        setIsLoggedIn(true);
        navigate("/");
      }
      else {
        toast.error("Email or password is incorrect");
    }

    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
}

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a5af9] to-[#8268f9]"
    >
      {/* Logo section */}
      <div className="absolute top-0 left-1 p-4 flex items-center gap-2 no-underline">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl no-underline">
          <img src={assets.logo2} alt="Logo" width={150} height={150} />
          <span className="font-bold text-xl text-white"></span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur rounded-lg p-6 shadow-md w-full max-w-md">
        <h2 className="text-center mb-4 text-xl font-semibold text-gray-800">
          {isCreatingAccount ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={onSubmitHandler}>
            {

            isCreatingAccount && (
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="fullName"
                  placeholder="Enter fullname"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )

            }



          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              placeholder="**********"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex justify-between mb-4">
            <Link to="/reset-password" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium disabled:opacity-50" disabled={loading}>
            {loading ? "Loading..." : isCreatingAccount ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 text-sm text-gray-700">
            {isCreatingAccount ? (
              <>
                Already have an account?{' '}
                <span onClick={() => setIsCreatingAccount(false)} className="underline cursor-pointer text-indigo-600">
                  Login
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span onClick={() => setIsCreatingAccount(true)} className="underline cursor-pointer text-indigo-600">
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
