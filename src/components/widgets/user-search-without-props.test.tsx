import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/mocks/server";
import { UserSearchWithoutProps } from "./user-search-without-props";

describe("UserSearchWithoutProps", () => {
	it("shows loading state while search is pending", async () => {
		server.use(
			http.get("/api/users", async () => {
				await delay(100);

				return HttpResponse.json([{ id: "1", name: "Alice" }]);
			}),
		);
		const user = userEvent.setup();
		render(<UserSearchWithoutProps />);

		await user.type(screen.getByLabelText(/Search users/i), "ali");
		await user.click(screen.getByRole("button", { name: /Search/i }));

		expect(await screen.findByRole("status")).toHaveTextContent("Searching...");
	});

	it("displays users returned by search", async () => {
		const user = userEvent.setup();

		render(<UserSearchWithoutProps />);

		const button = screen.getByRole("button", { name: /Search/i });
		const input = screen.getByLabelText(/Search users/i);
		await user.type(input, "ali");
		await user.click(button);

		expect(await screen.findByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
	});

	it("displays empty state when no users are found", async () => {
		const user = userEvent.setup();
		render(<UserSearchWithoutProps />);

		const input = screen.getByLabelText(/Search users/i);

		await user.type(input, "alice");
		await user.click(screen.getByRole("button", { name: /Search/i }));

		expect(await screen.findByText("No users found")).toBeInTheDocument();

		expect(screen.queryByText("Alice")).not.toBeInTheDocument();
		expect(screen.queryByText("Bob")).not.toBeInTheDocument();
	});

	it("shows an error when the server returns 500", async () => {
		const user = userEvent.setup();
		server.use(
			http.get("/api/users", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		render(<UserSearchWithoutProps />);

		const input = screen.getByLabelText(/Search users/i);

		await user.type(input, "ali");
		await user.click(screen.getByRole("button", { name: /Search/i }));

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Failed to search users",
		);
	});

	it("hides loading state after request fails", async () => {
		const user = userEvent.setup();
		server.use(
			http.get("/api/users", async () => {
				await delay(100);
				return new HttpResponse(null, { status: 500 });
			}),
		);

		render(<UserSearchWithoutProps />);

		const input = screen.getByLabelText(/Search users/i);

		await user.type(input, "ali");
		await user.click(screen.getByRole("button", { name: /Search/i }));

		const loader = await screen.findByRole("status");
		expect(loader).toBeInTheDocument();
		expect(loader).toHaveTextContent(/Searching.../i);

		const alert = await screen.findByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveTextContent(/Failed to search users/i);

		expect(screen.queryByRole("status")).not.toBeInTheDocument();
	});
});
