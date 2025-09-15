import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import { Moon, Sun } from "lucide-react";
import GlobalButton from "./common/GlobalButton";

export default function Navbar() {
  const user = useSelector((s: RootState) => s.auth.user);
  const theme = useSelector((s: RootState) => s.theme.mode);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-black shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-primary">
          Money Tracker
        </Link>

        <div className="flex items-center space-x-4">
          {/* Theme toggle button */}
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
              <span className="text-sm dark:text-[#00a2ff]">
                Hi, {user.name}
              </span>
              <GlobalButton
                onClick={() => {
                  dispatch(logout());
                  nav("/login");
                }}
              >
                Logout
              </GlobalButton>
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
