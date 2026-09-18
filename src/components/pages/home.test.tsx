import { describe, expect, it } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/render";
import { Home } from "./home";

describe("Home", () => {
	it("renders the main call to action", () => {
		renderWithProviders(<Home />);

		expect(
			screen.getByRole("heading", { name: /welcome to our platform/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /start free trial/i }),
		).toBeEnabled();
	});

	it("supports user interaction", async () => {
		const user = userEvent.setup();
		renderWithProviders(<Home />);
		const button = screen.getByRole("button", { name: /get started/i });

		await user.click(button);

		expect(button).toHaveFocus();
	});
});
