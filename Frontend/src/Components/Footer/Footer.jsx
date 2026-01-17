import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="bg-steel-blue w-full">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-8 px-8 sm:px-12 lg:px-16 items-start text-center lg:text-left">
          <div>
            <h3 className="text-gold text-3xl pb-3">Monasba</h3>
            <p className="text-light-neutral text-sm">
              Discover, book, and celebrate life’s moments with ease.
            </p>
          </div>

          <div>
            <h3 className="text-gold text-xl mb-2">Quick Links</h3>
            <p className="text-light-neutral text-sm py-0.5">
              <NavLink
                to="/home"
                onClick={() => {
                  document.getElementById("home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0 hover:text-(--color-gold) text-(--color-light-neutral)"
              >
                Home
              </NavLink>
            </p>
            <p className="text-light-neutral text-sm py-0.5">
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
            </p>
            <p className="text-light-neutral text-sm py-0.5">
              <NavLink
                to="/search"
                className="block py-2 px-3 rounded-sm md:p-0 text-(--color-light-neutral) hover:text-(--color-gold)"
              >
                Events
              </NavLink>
            </p>
          </div>

          <div>
            <h3 className="text-gold text-xl mb-2">Contact</h3>
            <div className="flex items-center justify-center lg:justify-start py-0.5">
              <i className="fa-solid fa-envelope text-state-blue pr-2"></i>
              <p className="text-light-neutral text-sm">monasbaa@gmail.com</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start py-0.5">
              <i className="fa-solid fa-phone text-state-blue pr-2"></i>

              <p className="text-light-neutral text-sm">01194837583</p>
            </div>
          </div>

          <div>
            <h3 className="text-gold text-xl mb-2 text-center">Follow Us</h3>
            <div className="flex justify-center items-center  pt-1">
              <i className="fa-brands fa-x-twitter text-state-blue text-xl pr-2"></i>
              <i className="fa-brands fa-facebook text-state-blue text-xl pr-2"></i>
              <i className="fa-brands fa-instagram text-state-blue text-xl pr-2"></i>
            </div>
          </div>
        </div>

        <div className="text-center text-light-neutral py-4 border-t border-light-neutral/20">
          © 2025 Monasba. All rights reserved.
        </div>
      </div>
    </>
  );
}
