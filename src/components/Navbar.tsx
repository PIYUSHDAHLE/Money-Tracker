import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import { Moon, Sun } from "lucide-react";
import GlobalButton from "./common/GlobalButton";
import {
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
  Layers,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const user = useSelector((s: RootState) => s.auth.user);
  const theme = useSelector((s: RootState) => s.theme.mode);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-black shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-primary">
          Money Tracker
        </Link>

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
              <div className="relative inline-block text-left"   onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}>
          <div className="py-[2px]"></div>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-[#00142B] transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm dark:text-[#00a2ff]">
                      {user.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                    <div className="py-[2px]"></div>
                {open && (
                  <>
                  <div className="absolute  right-0 w-64 bg-blue-100 border border-none rounded-lg shadow-lg z-50 dark:bg-[#00142B] overflow-hidden">
                    <ul className="">
                      <li>
                        <button
                          className="flex px-4 py-2 items-center hover:bg-blue-200 space-x-2 cursor-pointer hover:text-blue-600 w-full"
                          onClick={() => {
                            nav("/dashboard");
                          }}
                        >
                          <Layers className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                      </li>
                      <li>
                        <button className="flex px-4 py-2 items-center hover:bg-blue-200 space-x-2 cursor-pointer hover:text-blue-600 w-full">
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                      </li>
                      <li>
                        <button className="flex px-4 py-2 items-center hover:bg-blue-200 space-x-2 cursor-pointer hover:text-blue-600 w-full">
                          <HelpCircle className="w-4 h-4" />
                          <span>Support Center</span>
                        </button>
                      </li>
                    </ul>
                    <div className="border-t border-gray-200 dark:border-gray-700 ">
                      <button
                        className="w-full flex items-center space-x-2 px-[18px] py-2 hover:text-red-600 hover:bg-red-50 rounded-b-lg"
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
                    </>
                )}
              </div>
            </>
          ) : (
            <>
              <GlobalButton
                onClick={() => {
                  nav("/login");
                }}
              >
                Login
              </GlobalButton>
              <GlobalButton
                onClick={() => {
                  nav("/register");
                }}
              >
                Register
              </GlobalButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
