import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createDeferred } from "@/lib/test-utils";
import { LoginForm } from "./login-form";

// setup
// async function _fillLoginForm(
// 	user: ReturnType<typeof userEvent.setup>,
// 	email: string,
// 	password: string,
// ) {
// 	await user.type(screen.getByRole("textbox", { name: /email/i }), email);

// 	await user.type(screen.getByLabelText(/password/i), password);
// }

describe("LoginForm", () => {
	it("form contains Email, Password, and a Sign in button", () => {
		render(<LoginForm onSubmit={vi.fn()} />);

		expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
		const passwordInput = screen.getByLabelText(/Password/i);
		expect(passwordInput).toBeInTheDocument();
		expect(passwordInput).toHaveAttribute("type", "password");
		const button = screen.getByRole("button", { name: /Sign in/i });
		expect(button).toBeInTheDocument();
		expect(button).toBeEnabled();
	});

	it("shows validation error and does not submit an empty form", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();

		render(<LoginForm onSubmit={onSubmit} />);

		await user.click(screen.getByRole("button", { name: /sign in/i }));

		expect(screen.getByRole("alert")).toHaveTextContent(
			/Email and password are required/i,
		);

		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("after entering the email and password, `onSubmit` is called with the correct arguments", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		const email = "test@email.com";
		const password = "qwerty12";
		render(<LoginForm onSubmit={onSubmit} />);

		const emailInput = screen.getByRole("textbox", { name: /Email/i });
		const passwordInput = screen.getByLabelText(/Password/i);
		await user.type(emailInput, email);
		await user.type(passwordInput, password);
		const button = screen.getByRole("button", { name: /Sign in/i });
		await user.click(button);

		expect(onSubmit).toHaveBeenCalledWith(email, password);
	});

	it("if onSubmit is pending, the button is disabled and displays `Signing in...`", async () => {
		const user = userEvent.setup();
		const { promise, resolve } = createDeferred();

		const onSubmit = async (_email: string, _password: string) => {
			await promise;
		};
		const email = "test@email.com";
		const password = "qwerty12";
		render(<LoginForm onSubmit={onSubmit} />);

		const emailInput = screen.getByRole("textbox", { name: /Email/i });
		const passwordInput = screen.getByLabelText(/Password/i);
		await user.type(emailInput, email);
		await user.type(passwordInput, password);
		const button = screen.getByRole("button", { name: /Sign in/i });
		await user.click(button);

		expect(button).toHaveTextContent(/Signing in.../i);
		expect(button).toBeDisabled();

		resolve();

		await waitFor(() => expect(button).toHaveTextContent(/Sign in/i));
		expect(button).toBeEnabled();

		// without waitFor()
		// const signInButton = await screen.findByRole("button", {
		// 	name: /sign in/i,
		// });

		// expect(signInButton).toBeEnabled();
	});

	it("if submit is rejected, alert is `Invalid email or password`, and button becomes active again.", async () => {
		const user = userEvent.setup();
		const { promise, reject } = createDeferred();

		const onSubmit = async (_email: string, _password: string) => {
			await promise;
		};
		const email = "test@email.com";
		const password = "qwerty12";
		render(<LoginForm onSubmit={onSubmit} />);

		const emailInput = screen.getByRole("textbox", { name: /Email/i });
		const passwordInput = screen.getByLabelText(/Password/i);
		await user.type(emailInput, email);
		await user.type(passwordInput, password);
		const button = screen.getByRole("button", { name: /Sign in/i });
		await user.click(button);

		expect(button).toHaveTextContent(/Signing in.../i);
		expect(button).toBeDisabled();

		reject();

		const alert = await screen.findByRole("alert");
		expect(alert).toHaveTextContent(/Invalid email or password/i);
		expect(button).toBeEnabled();
	});
});
