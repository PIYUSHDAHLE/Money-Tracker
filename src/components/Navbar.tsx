import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import {
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
  Layers,
  Settings,
} from "lucide-react";
import GlobalButton from "./common/GlobalButton";
import logoImage from "/images/money-tracker-by-piyush-dahle-logo-image.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const user = useSelector((s: RootState) => s.auth.user);
  const theme = useSelector((s: RootState) => s.theme.mode);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-black shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-lg text-primary flex items-center justify-center gap-2"
        >
          <img
            src={logoImage}
            className="h-14 w-14 rounded-full border-2 border-blue-400 shadow-lg"
            alt="Logo"
          />
          <h2 className="text-lg text-blue-700 dark:text-blue-400 font-bold">
            Money Tracker
          </h2>
        </Link>

        <nav className="hidden lg:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
            }
          >
            Support
          </NavLink>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-blue-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
          {user ? (
            <>
              <div
                className="relative hidden lg:block text-left"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-[#00142B] dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-sm dark:text-[#00a2ff]">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {open && (
                  <div className="absolute right-0 w-64 bg-blue-100 rounded-lg shadow-lg z-50 dark:bg-[#00142B] overflow-hidden">
                    <ul>
                      <li>
                        <button
                          className="flex px-4 py-2 items-center hover:bg-blue-200 dark:hover:bg-gray-800 space-x-2 w-full"
                          onClick={() => nav("/dashboard")}
                        >
                          <Layers className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                      </li>
                      <li>
                        <button className="flex px-4 py-2 items-center hover:bg-blue-200 dark:hover:bg-gray-800 space-x-2 w-full">
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex px-4 py-2 items-center hover:bg-blue-200 dark:hover:bg-gray-800 space-x-2 w-full"
                          onClick={() => nav("/support")}
                        >
                          <HelpCircle className="w-4 h-4" />
                          <span>Support Center</span>
                        </button>
                      </li>
                    </ul>
                    <div className="border-t border-gray-300 dark:border-gray-700">
                      <button
                        className="w-full flex items-center space-x-2 px-[18px] py-2 hover:text-red-600 hover:bg-red-50 dark:hover:text-white dark:hover:bg-red-300/50 rounded-b-lg"
                        onClick={() => {
                          dispatch(logout());
                          nav("/login");
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <GlobalButton
                onClick={() => nav("/login")}
                className="hidden lg:block"
              >
                Login
              </GlobalButton>
              <GlobalButton
                onClick={() => nav("/register")}
                className="hidden lg:block"
              >
                Register
              </GlobalButton>
            </>
          )}

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 h-screen flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="w-3/4 sm:w-1/2 md:w-1/3 bg-white dark:bg-black h-full shadow-lg flex flex-col px-6 py-6 space-y-6"
            >
              <div className="flex justify-between items-center ">
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Menu
                </h3>
                <button onClick={() => setMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 text-gray-700 dark:text-gray-300 font-medium">
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
                  }
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/support"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "hover:text-blue-500"}`
                  }
                >
                  Support
                </NavLink>
              </nav>

                        {user ? (
            <>
              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-[#00142B] dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-sm dark:text-[#00a2ff]">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {open && (
                  <div className="absolute right-0 w-64 bg-blue-100 rounded-lg shadow-lg z-50 dark:bg-[#00142B] overflow-hidden">
                    <ul>
                      <li>
                        <button
                          className="flex px-4 py-2 items-center hover:bg-blue-200 dark:hover:bg-gray-800 space-x-2 w-full"
                          onClick={() => nav("/dashboard")}
                        >
                          <Layers className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                      </li>
                      <li>
                        <button className="flex px-4 py-2 items-center hover:bg-blue-200 dark:hover:bg-gray-800 space-x-2 w-full">
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex px-4 py-2 items-center hover:bg-blue-200 dark:hover:bg-gray-800 space-x-2 w-full"
                          onClick={() => nav("/support")}
                        >
                          <HelpCircle className="w-4 h-4" />
                          <span>Support Center</span>
                        </button>
                      </li>
                    </ul>
                    <div className="border-t border-gray-300 dark:border-gray-700">
                      <button
                        className="w-full flex items-center space-x-2 px-[18px] py-2 hover:text-red-600 hover:bg-red-50 dark:hover:text-white dark:hover:bg-red-300/50 rounded-b-lg"
                        onClick={() => {
                          dispatch(logout());
                          nav("/login");
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
             <div className="flex flex-col space-y-3 pt-6">
                  <GlobalButton
                    onClick={() => {
                      setMenuOpen(false);
                      nav("/login");
                    }}
                  >
                    Login
                  </GlobalButton>
                  <GlobalButton
                    onClick={() => {
                      setMenuOpen(false);
                      nav("/register");
                    }}
                  >
                    Register
                  </GlobalButton>
                </div>
            </>
          )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
