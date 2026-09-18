import { expect, test } from "@playwright/test";

test("opens the home page", async ({ page }) => {
	await page.goto("/");

	await expect(
		page.getByRole("heading", { name: /welcome to our platform/i }),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();
});

test("navigates to the profile page", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Profile" }).click();

	await expect(page).toHaveURL(/\/profile$/);
	await expect(page.getByText("profile", { exact: true })).toBeVisible();
});
