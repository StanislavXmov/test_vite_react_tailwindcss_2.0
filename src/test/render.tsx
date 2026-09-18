import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";

function createWrapper(queryClient: QueryClient) {
	return function TestProviders({ children }: PropsWithChildren) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
	};
}

export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	return {
		queryClient,
		...render(ui, {
			wrapper: createWrapper(queryClient),
			...options,
		}),
	};
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
