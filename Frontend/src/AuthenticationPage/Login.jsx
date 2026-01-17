import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./context/AppContext";
import { toast } from "react-toastify";
import { assets } from "./assets/assets";
import { useUser } from "../store/useUser";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [isCreatingAccount, setIsCreatingAccount] = useState(
    location.state?.isCreatingAccount || false,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(location.state?.role || "user");
  const [loading, setLoading] = useState(false);

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const { setUser } = useUser();

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
    if (location.state?.isCreatingAccount !== undefined) {
      setIsCreatingAccount(location.state.isCreatingAccount);
    }
  }, [location.state]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.defaults.withCredentials = true;
    try {
      if (isCreatingAccount) {
        const response = await axios.post(`${backendUrl}/register`, {
          name,
          email,
          password,
          role,
        });
        if (response.status === 201) {
          setUser(response.data);
          toast.success("Account created successfully!");
          setIsCreatingAccount(false);
          navigate("/");
        }
      } else {
        const response = await axios.post(`${backendUrl}/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          setUser(response.data);
          toast.success("Logged in successfully!");
          getUserData();
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast.error("Email or password is incorrect");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-neutral">
      <div className="bg-steel-blue w-full">
        <div className="max-w-8xl px-2 sm:px-4 py-4 mx-auto flex justify-between items-center">
          <Link to="/" className="">
            <img src={assets.logo2} alt="Logo" className="h-8" />
          </Link>
          <Link to="/home" className="flex gap-2 items-center">
            <span className="text-white text-lg">Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-8xl px-2 sm:px-4 py-4 mx-auto flex justify-center mt-16">
        <div className="bg-dark-navy py-8 px-10 rounded-xl shadow-2xl lg:min-w-lg md:min-w-md ">
          <h2 className="text-center mb-8 text-3xl font-semibold text-light-neutral">
            {isCreatingAccount ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={onSubmitHandler}>
            {isCreatingAccount && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-light-neutral mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="bg-steel-blue py-3 w-full px-3 text-light-neutral border border-state-blue rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="fullName"
                    placeholder="Enter fullname"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-light-neutral mb-1"
                  >
                    I am a:
                  </label>
                  <select
                    id="role"
                    className="bg-steel-blue py-3 w-full px-3 text-light-neutral border border-state-blue rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">Organizer</option>
                    <option value="provider">Provider</option>
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-light-neutral mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                className="bg-steel-blue py-3 w-full px-3 text-light-neutral border border-state-blue rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-light-neutral mb-1"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-steel-blue py-3 w-full px-3 text-light-neutral border border-state-blue rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="password"
                placeholder="**********"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex justify-between mb-4">
              <Link
                to="/reset-password"
                className="text-sm text-light-neutral hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-state-blue hover:bg-cool-gray/50 text-white py-3 rounded-md font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : isCreatingAccount ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="mb-0 text-sm text-light-neutral">
              {isCreatingAccount ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsCreatingAccount(false)}
                    className="underline cursor-pointer text-light-neutral"
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsCreatingAccount(true)}
                    className="underline cursor-pointer text-light-neutral"
                  >
                    Sign up
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
