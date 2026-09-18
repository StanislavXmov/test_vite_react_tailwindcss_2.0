import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	createRoute,
	Link,
} from "@tanstack/react-router";
import { Home } from "./pages/home";
import { RootComponent } from "./root-component";

export const rootRoute = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});

export const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

export const profileRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/profile",
	component: () => <div>profile</div>,
});
