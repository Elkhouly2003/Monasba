import { NavLink } from "react-router-dom";
import img1 from "../../assets/icons/LOGO.png";
import { useUser } from "../../store/useUser";
import { useContext } from "react";
import { AppContext } from "../../AuthenticationPage/context/AppContext";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const { user } = useUser();
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <nav className="border-gray-200 bg-(--color-steel-blue)">
        <div className="max-w-8xl flex flex-wrap items-center justify-between mx-auto py-4 px-2 sm:px-4">
          <NavLink
            to="/home"
            onClick={() => {
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={img1} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-(--color-gold)"></span>
          </NavLink>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-(--color-steel-blue)">
              <li>
                <NavLink
                  to="/home"
                  className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0 hover:text-(--color-gold) text-(--color-light-neutral)"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home"
                  onClick={() => {
                    document.getElementById("categories")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="block py-2 px-3 rounded-sm md:border-0 hover:text-(--color-gold) md:p-0 text-(--color-light-neutral)"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  className="block py-2 px-3 rounded-sm md:p-0 text-(--color-light-neutral) hover:text-(--color-gold)"
                >
                  Browse Events
                </NavLink>
              </li>
              <li
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <NavLink
                  to="/home"
                  className="block py-2 px-3 rounded-sm md:border-0 hover:text-(--color-gold) md:p-0 text-(--color-light-neutral)"
                >
                  About
                </NavLink>
              </li>
              <li>
                {user ? (
                  <NavLink
                    to={
                      user.role === "provider"
                        ? "/provider"
                        : user.role === "admin"
                          ? "/admin"
                          : "/profile"
                    }
                    className="text-(--color-state-blue) min-w-12 min-h-12 flex justify-center items-center rounded-4xl bg-(--color-light-neutral) cursor-pointer"
                  >
                    <i className="fa-solid fa-user text-2xl"></i>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="text-(--color-light-neutral) bg-(--color-state-blue) focus:outline-none font-medium rounded-full text-sm px-4 py-0.5 border-2 border-(--color-state-blue) hover:text-(--color-gold) cursor-pointer"
                  >
                    Sign in
                  </NavLink>
                )}
              </li>
              <li>
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      navigate("/home");
                    }}
                    className="cursor-pointer block py-2 px-3 text-white rounded-sm hover:text-red-500 md:p-0"
                  >
                    Log Out
                  </button>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
