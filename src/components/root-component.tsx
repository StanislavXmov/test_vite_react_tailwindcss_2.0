import { Link, Outlet } from "@tanstack/react-router";
import { Home, User, Settings, Bell } from "lucide-react";

export function RootComponent() {
  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                activeProps={{
                  className:
                    "flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold transition-all duration-200",
                }}
                activeOptions={{ exact: true }}
                className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/profile"
                  activeProps={{
                    className:
                      "flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold",
                  }}
                  className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <button className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-indigo-600"></span>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
