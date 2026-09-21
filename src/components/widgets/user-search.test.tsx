import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createDeferred } from "@/lib/test-utils";
import { UserSearch } from "./user-search";

const users = [
	{
		id: "0",
		name: "Alice",
	},
	{
		id: "1",
		name: "Bob",
	},
];

describe("UserSearch", () => {
	it("before search `Searching... does not exist", () => {
		render(<UserSearch searchUsers={vi.fn()} />);

		expect(screen.queryByText("Searching...")).not.toBeInTheDocument();
	});

	it("in search state pending, showing `Searching...`", async () => {
		const user = userEvent.setup();
		const { promise } = createDeferred();
		const searchUsers = async (_query: string) => {
			await promise;
			return users;
		};
		render(<UserSearch searchUsers={searchUsers} />);

		const button = screen.getByRole("button", { name: /Search/i });
		await user.click(button);

		const loader = await screen.findByRole("status");
		expect(loader).toBeInTheDocument();
		expect(loader).toHaveTextContent(/Searching.../i);

		// expect(screen.getByRole("status")).toHaveTextContent("Searching...");
	});

	it("after succes search, show users", async () => {
		const user = userEvent.setup();
		const { promise, resolve } = createDeferred();
		const searchUsers = async (_query: string) => {
			await promise;
			return users;
		};
		render(<UserSearch searchUsers={searchUsers} />);

		const button = screen.getByRole("button", { name: /Search/i });
		await user.click(button);

		resolve();

		const user1 = await screen.findByText(users[0].name);
		expect(user1).toBeInTheDocument();
		const user2 = await screen.findByText(users[1].name);
		expect(user2).toBeInTheDocument();

		expect(screen.queryByRole("status")).not.toBeInTheDocument();
	});

	it("if search return empty users list", async () => {
		const user = userEvent.setup();
		const { promise, resolve } = createDeferred();
		const searchUsers = async (_query: string) => {
			await promise;
			return [];
		};
		render(<UserSearch searchUsers={searchUsers} />);

		const button = screen.getByRole("button", { name: /Search/i });
		await user.click(button);

		resolve();

		const notFoundMessage = await screen.findByText("No users found");
		expect(notFoundMessage).toBeInTheDocument();
	});
});
