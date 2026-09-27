import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/mocks/server";
import { CreateUserForm } from "./create-user-form";

// setup
async function fillUserForm(
	user: ReturnType<typeof userEvent.setup>,
	name: string,
	email: string,
) {
	const inputName = screen.getByLabelText(/Name/i);
	await user.type(inputName, name);
	const inputEmail = screen.getByLabelText(/Email/i);
	await user.type(inputEmail, email);
}

describe("CreateUserForm", () => {
	it("Name and email are required", async () => {
		const user = userEvent.setup();
		const requests: Request[] = [];

		const listener = ({ request }: { request: Request }) => {
			if (request.url.includes("/api/users") && request.method === "POST") {
				requests.push(request);
			}
		};
		render(<CreateUserForm />);

		server.events.on("request:start", listener);

		await user.click(screen.getByRole("button", { name: /Create user/i }));

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Name and email are required",
		);
		expect(requests).toHaveLength(0);

		server.events.removeListener("request:start", listener);
	});

	it("successful user creation", async () => {
		const user = userEvent.setup();

		render(<CreateUserForm />);

		await fillUserForm(user, "Alice", "alice@example.com");

		await user.click(screen.getByRole("button", { name: /Create user/i }));

		expect(await screen.findByRole("status")).toHaveTextContent(
			"User Alice created",
		);
	});

	it("form reset after user creation", async () => {
		const user = userEvent.setup();

		render(<CreateUserForm />);

		await fillUserForm(user, "Alice", "alice@example.com");

		await user.click(screen.getByRole("button", { name: /Create user/i }));

		expect(await screen.findByRole("status")).toHaveTextContent(
			"User Alice created",
		);

		expect(screen.getByLabelText(/Name/i)).toHaveValue("");
		expect(screen.getByLabelText(/Email/i)).toHaveValue("");
	});

	it("show loading state", async () => {
		const user = userEvent.setup();
		server.use(
			http.post("/api/users", async () => {
				await delay(100);
				return HttpResponse.json({
					id: "1",
					name: "Alice",
					email: "alice@example.com",
				});
			}),
		);

		render(<CreateUserForm />);

		await fillUserForm(user, "Alice", "alice@example.com");
		const button = screen.getByRole("button", { name: /Create user/i });
		await user.click(button);

		expect(screen.getByRole("button", { name: /Creating/i })).toBeDisabled();
	});

	it("shows an error when request fails", async () => {
		const user = userEvent.setup();
		server.use(
			http.post("/api/users", async () => {
				await delay(100);
				return new HttpResponse(null, { status: 500 });
			}),
		);

		render(<CreateUserForm />);

		await fillUserForm(user, "Alice", "alice@example.com");
		const button = screen.getByRole("button", { name: /Create user/i });
		await user.click(button);

		expect(button).toBeDisabled();
		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Failed to create user",
		);
		expect(button).toBeEnabled();
	});
});
