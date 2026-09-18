import { Link, Outlet } from "@tanstack/react-router";
import { Bell, Home, Settings, User } from "lucide-react";

export function RootComponent() {
	return (
		<>
			<nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center gap-8">
							<Link
								to="/"
								activeProps={{
									className:
										"flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold transition-all duration-200",
								}}
								activeOptions={{ exact: true }}
								className="flex items-center gap-2 rounded-full px-4 py-2 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
							>
								<Home className="h-5 w-5" />
								Home
							</Link>
							<div className="hidden items-center gap-2 md:flex">
								<Link
									to="/profile"
									activeProps={{
										className:
											"flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold",
									}}
									className="flex items-center gap-2 rounded-full px-4 py-2 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
								>
									<User className="h-5 w-5" />
									Profile
								</Link>
								<button
									type="button"
									className="flex items-center gap-2 rounded-full px-4 py-2 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
								>
									<Settings className="h-5 w-5" />
									Settings
								</button>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<button
								type="button"
								className="relative rounded-full p-2 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
							>
								<Bell className="h-5 w-5" />
								<span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-indigo-600 bg-red-500"></span>
							</button>
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-500 font-bold text-white shadow-md">
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
