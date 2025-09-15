import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const activeStyle =
    "underline underline-offset-4 text-green-700 font-semibold";

  const handleSignOut = (e) => {
    e.preventDefault();
    context.handleSignOut();
    navigate("/sign-in");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <nav className="fixed z-10 top-0 w-full bg-gradient-to-r from-green-950 via-green-900 to-green-950 text-green-50 shadow-lg backdrop-blur-md">
      {/* Main navbar */}
      <div className="flex items-center py-4 px-4 md:px-8">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7 text-green-100" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-green-100" />
            )}
          </button>
          <NavLink
            to="/"
            className="font-extrabold text-2xl bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent"
          >
            Sporti
          </NavLink>

          {/* Desktop categories */}
          <ul className="hidden md:flex items-center gap-6 ml-6 text-green-100">
            <li>
              <NavLink
                to="/"
                onClick={() => context.setSearchByCategory()}
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gk-gloves"
                onClick={() => context.setSearchByCategory("gk gloves")}
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                GK Gloves
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gk-pants"
                onClick={() => context.setSearchByCategory("gk pants")}
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                GK Pants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gk-shirts"
                onClick={() => context.setSearchByCategory("gk shirts")}
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                GK Shirts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gk-padded-pants"
                onClick={() => context.setSearchByCategory("gk padded pants")}
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                GK Padded Pants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/soccer-balls"
                onClick={() => context.setSearchByCategory("soccer balls")}
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                Soccer Balls
              </NavLink>
            </li>

            {/* Uniform Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("uniform")}
                className="flex items-center gap-1 hover:text-green-300"
              >
                Uniform <ChevronDownIcon className="h-4 w-4" />
              </button>
              {openDropdown === "uniform" && (
                <ul className="absolute left-0 mt-2 bg-green-800/95 rounded-lg shadow-lg w-44 text-green-100">
                  <li>
                    <NavLink
                      to="/uniform/jerseys"
                      onClick={() =>
                        context.setSearchByCategory("uniform jerseys")
                      }
                      className="block px-4 py-2 hover:bg-green-700"
                    >
                      Jerseys
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/uniform/shorts"
                      onClick={() =>
                        context.setSearchByCategory("uniform shorts")
                      }
                      className="block px-4 py-2 hover:bg-green-700"
                    >
                      Shorts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/uniform/socks"
                      onClick={() =>
                        context.setSearchByCategory("uniform socks")
                      }
                      className="block px-4 py-2 hover:bg-green-700"
                    >
                      Socks
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Accessories Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("accessories")}
                className="flex items-center gap-1 hover:text-green-300"
              >
                Accessories <ChevronDownIcon className="h-4 w-4" />
              </button>
              {openDropdown === "accessories" && (
                <ul className="absolute left-0 mt-2 bg-green-800/95 rounded-lg shadow-lg w-44 text-green-100">
                  <li>
                    <NavLink
                      to="/accessories/bags"
                      onClick={() => context.setSearchByCategory("bags")}
                      className="block px-4 py-2 hover:bg-green-700"
                    >
                      Bags
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/accessories/caps"
                      onClick={() => context.setSearchByCategory("caps")}
                      className="block px-4 py-2 hover:bg-green-700"
                    >
                      Caps
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/accessories/bottles"
                      onClick={() => context.setSearchByCategory("bottles")}
                      className="block px-4 py-2 hover:bg-green-700"
                    >
                      Water Bottles
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 ml-auto">
          {context.isUserAuthenticated ? (
            <>
              <span className="hidden md:block text-sm text-green-200">
                {context.account?.email}
              </span>
              <NavLink
                to="/manage-items"
                className={({ isActive }) => (isActive ? activeStyle : "")}
              >
                Manage
              </NavLink>
              <button
                onClick={handleSignOut}
                className="hidden md:block text-red-400 hover:text-red-500"
              >
                Sign Out
              </button>
            </>
          ) : (
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `bg-green-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-green-700 ${
                  isActive ? "bg-green-700" : ""
                }`
              }
            >
              Sign In
            </NavLink>
          )}

          {/* Cart */}
          <button
            className="flex items-center relative cursor-pointer"
            onClick={() => context.openCheckoutSideMenu()}
          >
            <ShoppingCartIcon className="h-7 w-7 text-green-200 hover:text-green-300" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {context.cartProducts.length}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-green-950 via-green-900 to-green-950/95 backdrop-blur-md text-green-100 z-50 md:hidden">
          {/* Header */}
          <div className="flex justify-between items-center py-5 px-4 border-b border-green-800/40">
            <span className="font-extrabold text-2xl text-green-200">
              Sporti
            </span>
            <button onClick={toggleMenu}>
              <XMarkIcon className="h-6 w-6 text-green-200 hover:text-green-400" />
            </button>
          </div>

          {/* Menu items */}
          <div className="bg-green-900/95 flex flex-col min-h-screen">
            <ul className="flex flex-col py-4 space-y-2 px-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    context.setSearchByCategory();
                    toggleMenu();
                  }}
                  className="block py-2 hover:text-green-300"
                >
                  All
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gk-gloves"
                  onClick={() => {
                    context.setSearchByCategory("gk gloves");
                    toggleMenu();
                  }}
                  className="block py-2 hover:text-green-300"
                >
                  GK Gloves
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gk-pants"
                  onClick={() => {
                    context.setSearchByCategory("gk pants");
                    toggleMenu();
                  }}
                  className="block py-2 hover:text-green-300"
                >
                  GK Pants
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gk-shirts"
                  onClick={() => {
                    context.setSearchByCategory("gk shirts");
                    toggleMenu();
                  }}
                  className="block py-2 hover:text-green-300"
                >
                  GK Shirts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gk-padded-pants"
                  onClick={() => {
                    context.setSearchByCategory("gk padded pants");
                    toggleMenu();
                  }}
                  className="block py-2 hover:text-green-300"
                >
                  GK Padded Pants
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/soccer-balls"
                  onClick={() => {
                    context.setSearchByCategory("soccer balls");
                    toggleMenu();
                  }}
                  className="block py-2 hover:text-green-300"
                >
                  Soccer Balls
                </NavLink>
              </li>

              {/* Uniform dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("uniform")}
                  className="flex justify-between w-full py-2 hover:text-green-300"
                >
                  Uniform <ChevronDownIcon className="h-5 w-5" />
                </button>
                {openDropdown === "uniform" && (
                  <ul className="pl-6 space-y-1 text-green-200">
                    <li>
                      <NavLink
                        to="/uniform/jerseys"
                        onClick={() => {
                          context.setSearchByCategory("uniform jerseys");
                          toggleMenu();
                        }}
                        className="block py-1 hover:bg-green-800/30 rounded-md"
                      >
                        Jerseys
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/uniform/shorts"
                        onClick={() => {
                          context.setSearchByCategory("uniform shorts");
                          toggleMenu();
                        }}
                        className="block py-1 hover:bg-green-800/30 rounded-md"
                      >
                        Shorts
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/uniform/socks"
                        onClick={() => {
                          context.setSearchByCategory("uniform socks");
                          toggleMenu();
                        }}
                        className="block py-1 hover:bg-green-800/30 rounded-md"
                      >
                        Socks
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Accessories dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("accessories")}
                  className="flex justify-between w-full py-2 hover:text-green-300"
                >
                  Accessories <ChevronDownIcon className="h-5 w-5" />
                </button>
                {openDropdown === "accessories" && (
                  <ul className="pl-6 space-y-1 text-green-200">
                    <li>
                      <NavLink
                        to="/accessories/bags"
                        onClick={() => {
                          context.setSearchByCategory("accessories bags");
                          toggleMenu();
                        }}
                        className="block py-1 hover:bg-green-800/30 rounded-md"
                      >
                        Bags
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/accessories/caps"
                        onClick={() => {
                          context.setSearchByCategory("accessories caps");
                          toggleMenu();
                        }}
                        className="block py-1 hover:bg-green-800/30 rounded-md"
                      >
                        Caps
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/accessories/bottles"
                        onClick={() => {
                          context.setSearchByCategory("accessories bottles");
                          toggleMenu();
                        }}
                        className="block py-1 hover:bg-green-800/30 rounded-md"
                      >
                        Water Bottles
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* Auth section */}
            {context.isUserAuthenticated && (
              <div className="border-t border-green-800/40 py-4 px-4">
                <ul className="flex flex-col gap-2 text-green-200">
                  <li>
                    <NavLink to="/manage-items" onClick={toggleMenu}>
                      Manage
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-account" onClick={toggleMenu}>
                      My Account
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-500 hover:text-red-400"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
