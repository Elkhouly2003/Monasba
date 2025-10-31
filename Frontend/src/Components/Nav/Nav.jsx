import { NavLink } from "react-router-dom";
import img1 from "../../assets/icons/LOGO.png";

export default function Nav() {
  return (
    <>
      <nav className=" border-gray-200 bg-[var(--color-steel-blue)]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={img1} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[var(--color-gold)]"></span>
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-[var(--color-steel-blue)] ">
              <li>
                <NavLink
                  href="#"
                  className="block py-2 px-3  rounded-sm md:bg-transparent  md:p-0 hover:text-[var(--color-gold)] text-[var(--color-light-neutral)]"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="block py-2 px-3 rounded-sm  md:border-0 hover:text-[var(--color-gold)] md:p-0 text-[var(--color-light-neutral)]"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="block py-2 px-3  rounded-sm  md:p-0 text-[var(--color-light-neutral)] hover:text-[var(--color-gold)]"
                >
                  Browe Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="block py-2 px-3 rounded-sm  md:border-0 hover:text-[var(--color-gold)] md:p-0 text-[var(--color-light-neutral)]"
                >
                  Exclusive Offers
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="block py-2 px-3 rounded-sm  md:border-0 hover:text-[var(--color-gold)] md:p-0 text-[var(--color-light-neutral)]"
                >
                  About
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="text-[var(--color-light-neutral)] bg-[var(--color-state-blue)]  focus:outline-none  font-medium rounded-full text-sm px-4 py-0.5 border-2 border-[var(--color-state-blue)] hover:text-[var(--color-gold)] cursor-pointer"
                >
                  Sign in
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
