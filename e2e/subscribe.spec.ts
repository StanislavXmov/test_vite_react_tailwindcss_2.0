import { expect, test } from "@playwright/test";

test("allows user to subscribe to the newsletter", async ({ page }) => {
	await page.goto("/subscribe");

	await page.getByLabel("Email").fill("john@example.com");
	await page.getByRole("button", { name: "Subscribe" }).click();

	await expect(page.getByText("Thanks for subscribing!")).toBeVisible();
});
